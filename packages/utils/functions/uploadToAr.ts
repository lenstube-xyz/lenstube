import axios from 'axios'
import type { PublicationMetadataV2Input } from 'lens'
import toast from 'react-hot-toast'

import { LENSTUBE_API_URL } from '../constants'
import type { ProfileMetadata } from '../custom-types'
import logger from '../logger'

const uploadToAr = async (
  data: PublicationMetadataV2Input | ProfileMetadata
): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${LENSTUBE_API_URL}/metadata/upload`,
      data
    )
    const { url } = response.data
    return url
  } catch (error) {
    logger.error('[Error AR Data Upload]', error)
    toast.error('Failed to upload metadata!')
    return null
  }
}

export default uploadToAr
