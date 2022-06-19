import { useQuery } from '@apollo/client'
import Layout from '@components/Common/Layout'
import MetaTags from '@components/Common/MetaTags'
import TimelineShimmer from '@components/Shimmers/TimelineShimmer'
import { Loader } from '@components/UIElements/Loader'
import { NoDataFound } from '@components/UIElements/NoDataFound'
import useAppStore from '@lib/store'
import { LENSTUBE_APP_ID } from '@utils/constants'
import { PROFILE_FEED_QUERY } from '@utils/gql/queries'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { useInView } from 'react-cool-inview'
import { AiOutlineComment } from 'react-icons/ai'
import { PaginatedResultInfo } from 'src/types'
import { LenstubePublication } from 'src/types/local'

const Timeline = dynamic(() => import('../../Home/Timeline'))

const SeeAllCommented = () => {
  const { selectedChannel, isAuthenticated } = useAppStore()
  const [commentedVideos, setCommentedVideos] = useState<LenstubePublication[]>(
    []
  )
  const [pageInfo, setPageInfo] = useState<PaginatedResultInfo>()

  const { data, loading, error, fetchMore } = useQuery(PROFILE_FEED_QUERY, {
    variables: {
      request: {
        publicationTypes: 'COMMENT',
        profileId: selectedChannel?.id,
        limit: 12,
        sources: [LENSTUBE_APP_ID]
      }
    },
    skip: !selectedChannel?.id,
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      setPageInfo(data?.publications?.pageInfo)
      setCommentedVideos(data?.publications?.items)
    }
  })

  const { observe } = useInView({
    threshold: 1,
    onEnter: () => {
      fetchMore({
        variables: {
          request: {
            publicationTypes: 'COMMENT',
            profileId: selectedChannel?.id,
            cursor: pageInfo?.next,
            limit: 12,
            sources: [LENSTUBE_APP_ID]
          }
        }
      }).then(({ data }: any) => {
        setPageInfo(data?.publications?.pageInfo)
        setCommentedVideos([...commentedVideos, ...data?.publications?.items])
      })
    }
  })

  return (
    <Layout>
      <MetaTags title="Commented Videos" />
      <div className="flex flex-col space-y-4 md:mb-4">
        <div className="flex items-center justify-between">
          <h1 className="inline-flex items-center space-x-2 text-lg font-semibold">
            <AiOutlineComment />
            <span>Commented Videos</span>
          </h1>
        </div>
        {(data?.publications?.items?.length === 0 || !isAuthenticated) && (
          <NoDataFound text="No commented videos." />
        )}
        {loading && <TimelineShimmer />}
        {!error && !loading && (
          <>
            <Timeline videos={commentedVideos} />
            {pageInfo?.next && commentedVideos.length !== pageInfo?.totalCount && (
              <span ref={observe} className="flex justify-center p-10">
                <Loader />
              </span>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}

export default SeeAllCommented
