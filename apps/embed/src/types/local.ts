import {
  Attribute,
  Comment,
  FeeCollectModuleSettings,
  FreeCollectModuleSettings,
  LimitedFeeCollectModuleSettings,
  LimitedTimedFeeCollectModuleSettings,
  Mirror,
  Post,
  RevertCollectModuleSettings,
  TimedFeeCollectModuleSettings
} from '.'

export type VideoDraft = {
  preview: string
  title: string
  description: string
}

export type FileReaderStreamType = NodeJS.ReadableStream & {
  name: string
  size: number
  type: string
  lastModified: string
}

export type UploadedVideo = {
  stream: FileReaderStreamType | null
  preview: string
  videoType: string
  file: File | null
  title: string
  description: string
  thumbnail: string
  thumbnailType: string
  playbackId: string
  videoCategory: { tag: string; name: string }
  percent: number
  isSensitiveContent: boolean
  isUploadToIpfs: boolean
  loading: boolean
  videoSource: string
  buttonText: string
  durationInSeconds: string | null
  collectModule: CollectModuleType
  disableComments: boolean
  isNSFW: boolean
  isNSFWThumbnail: boolean
}

export type CollectModuleType = {
  isTimedFeeCollect?: boolean
  isFreeCollect?: boolean
  isFeeCollect?: boolean
  isRevertCollect?: boolean
  isLimitedFeeCollect?: boolean
  isLimitedTimeFeeCollect?: boolean
  amount?: { currency?: string; value: string }
  referralFee?: number
  collectLimit?: string
  followerOnlyCollect?: boolean
  recipient?: string
}

export type LenstubePublication = Post & Comment & Mirror & { hls: HLSData }

export type IPFSUploadResult = {
  url: string
  type: string
}

export type HLSData = {
  hrn: string
  url: string
  type: string
}

export type VideoUploadForm = {
  videoThumbnail: IPFSUploadResult | null
  videoSource: string | null
  playbackId: string | null
  title: string
  description: string
  adultContent: boolean
}

export type StreamData = {
  streamKey: string
  hostUrl: string
  playbackId: string
  streamId: string
}

export type ProfileMetadata = {
  version: string
  metadata_id: string
  name: string | null
  bio: string | null
  cover_picture: string | null
  attributes: Attribute[]
}

export type LenstubeCollectModule = FreeCollectModuleSettings &
  FeeCollectModuleSettings &
  RevertCollectModuleSettings &
  TimedFeeCollectModuleSettings &
  LimitedFeeCollectModuleSettings &
  LimitedTimedFeeCollectModuleSettings
