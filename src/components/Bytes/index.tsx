import MetaTags from '@components/Common/MetaTags'
import { Loader } from '@components/UIElements/Loader'
import { NoDataFound } from '@components/UIElements/NoDataFound'
import useAppStore from '@lib/store'
import { Analytics, TRACK } from '@utils/analytics'
import {
  LENS_CUSTOM_FILTERS,
  LENSTUBE_BYTES_APP_ID,
  SCROLL_ROOT_MARGIN
} from '@utils/constants'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-cool-inview'
import type { PaginatedResultInfo } from 'src/types/lens'
import {
  PublicationSortCriteria,
  PublicationTypes,
  useExploreLazyQuery,
  usePublicationDetailsLazyQuery
} from 'src/types/lens'
import type { LenstubePublication } from 'src/types/local'

import ByteVideo from './ByteVideo'

const request = {
  sortCriteria: PublicationSortCriteria.CuratedProfiles,
  limit: 10,
  noRandomize: false,
  sources: [LENSTUBE_BYTES_APP_ID],
  publicationTypes: [PublicationTypes.Post],
  customFilters: LENS_CUSTOM_FILTERS
}

const Bytes = () => {
  const router = useRouter()
  const selectedChannel = useAppStore((state) => state.selectedChannel)
  const [bytes, setBytes] = useState<LenstubePublication[]>([])
  const [pageInfo, setPageInfo] = useState<PaginatedResultInfo>()
  const [singleByte, setSingleByte] = useState<LenstubePublication>()

  const [fetchPublication, { loading: singleByteLoading }] =
    usePublicationDetailsLazyQuery()

  const [fetchAllBytes, { loading, error, fetchMore }] = useExploreLazyQuery({
    variables: {
      request,
      reactionRequest: selectedChannel
        ? { profileId: selectedChannel?.id }
        : null,
      channelId: selectedChannel?.id ?? null
    },
    onCompleted: (data) => {
      setPageInfo(data?.explorePublications?.pageInfo)
      const items = data?.explorePublications?.items as LenstubePublication[]
      setBytes(items)
      const publicationId = router.query.id
      if (!publicationId) {
        router.push(`/bytes/?id=${items[0]?.id}`, undefined, {
          shallow: true
        })
      }
    }
  })

  const fetchSingleByte = async () => {
    const publicationId = router.query.id
    if (!publicationId) return fetchAllBytes()
    await fetchPublication({
      variables: {
        request: { publicationId },
        reactionRequest: selectedChannel
          ? { profileId: selectedChannel?.id }
          : null,
        channelId: selectedChannel?.id ?? null
      },
      onCompleted: (data) => {
        setSingleByte(data.publication as LenstubePublication)
        fetchAllBytes()
      }
    })
  }

  useEffect(() => {
    fetchSingleByte()
    Analytics.track('Pageview', { path: TRACK.PAGE_VIEW.BYTES })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { observe } = useInView({
    rootMargin: SCROLL_ROOT_MARGIN,
    onEnter: async () => {
      try {
        const { data } = await fetchMore({
          variables: {
            request: {
              ...request,
              cursor: pageInfo?.next
            }
          }
        })
        setPageInfo(data?.explorePublications?.pageInfo)
        setBytes([
          ...bytes,
          ...(data?.explorePublications?.items as LenstubePublication[])
        ])
      } catch {}
    }
  })

  if (loading || singleByteLoading)
    return (
      <div className="grid h-[80vh] place-items-center">
        <Loader />
      </div>
    )

  if (error) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <NoDataFound isCenter withImage text="No bytes found" />
      </div>
    )
  }

  return (
    <div className="overflow-y-hidden">
      <Head>
        <meta name="theme-color" content="#000000" />
      </Head>
      <MetaTags title="Bytes" />
      <div className="md:h-[calc(100vh-70px)] h-screen overflow-y-scroll no-scrollbar snap-y snap-mandatory scroll-smooth">
        {singleByte && <ByteVideo video={singleByte} />}
        {bytes?.map((video: LenstubePublication) => (
          <ByteVideo video={video} key={`${video?.id}_${video.createdAt}`} />
        ))}
        {pageInfo?.next && bytes.length !== pageInfo?.totalCount && (
          <span ref={observe} className="flex justify-center p-10">
            <Loader />
          </span>
        )}
      </div>
    </div>
  )
}

export default Bytes
