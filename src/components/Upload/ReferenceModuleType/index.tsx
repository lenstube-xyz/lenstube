import { Button } from '@components/UIElements/Button'
import Modal from '@components/UIElements/Modal'
import Tooltip from '@components/UIElements/Tooltip'
import useAppStore from '@lib/store'
import clsx from 'clsx'
import React, { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { ReferenceModuleType } from 'src/types/local'

const ReferenceModuleType = () => {
  const [showModal, setShowModal] = useState(false)
  const uploadedVideo = useAppStore((state) => state.uploadedVideo)
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)

  const setReferenceType = (data: ReferenceModuleType) => {
    setUploadedVideo({
      referenceModule: { ...uploadedVideo.collectModule, ...data }
    })
  }

  const getSelectedReferenceType = () => {
    const followerOnlyReferenceModule =
      uploadedVideo?.referenceModule?.followerOnlyReferenceModule
    const degreesOfSeparation =
      uploadedVideo?.referenceModule?.degreesOfSeparationReferenceModule
        ?.degreesOfSeparation
    if (!followerOnlyReferenceModule && !degreesOfSeparation) {
      return 'Anyone can comment or mirror'
    } else if (followerOnlyReferenceModule) {
      return 'Only my subscribers can comment or mirror'
    } else if (degreesOfSeparation && degreesOfSeparation > 0) {
      return 'Only channels that I subscribed to and their network'
    }
  }

  return (
    <>
      <div className="flex items-center mb-1 space-x-1.5">
        <div className="text-[11px] font-semibold uppercase opacity-70">
          Comments and Mirrors
        </div>
      </div>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-left border border-gray-200 focus:outline-none dark:border-gray-800 rounded-xl"
      >
        <span>{getSelectedReferenceType()}</span>
        <AiOutlineCheck />
      </button>
      <Modal
        title="Who can comment or mirror this publication?"
        panelClassName="max-w-lg"
        onClose={() => setShowModal(false)}
        show={showModal}
      >
        <div className="mt-2 space-y-4">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() =>
                setReferenceType({
                  followerOnlyReferenceModule: false,
                  degreesOfSeparationReferenceModule: {
                    commentsRestricted: false,
                    mirrorsRestricted: false,
                    degreesOfSeparation: 0
                  }
                })
              }
              className={clsx(
                'flex items-center justify-between w-full px-4 py-2 text-sm border border-gray-200 hover:!border-indigo-500 focus:outline-none dark:border-gray-800 rounded-xl',
                {
                  '!border-indigo-500':
                    !uploadedVideo.referenceModule
                      ?.followerOnlyReferenceModule &&
                    !uploadedVideo?.referenceModule
                      ?.degreesOfSeparationReferenceModule?.degreesOfSeparation
                }
              )}
            >
              <span>Anyone</span>
              {!uploadedVideo?.referenceModule?.followerOnlyReferenceModule &&
                !uploadedVideo?.referenceModule
                  ?.degreesOfSeparationReferenceModule?.degreesOfSeparation && (
                  <AiOutlineCheck />
                )}
            </button>
            <button
              type="button"
              onClick={() =>
                setReferenceType({
                  followerOnlyReferenceModule: true,
                  degreesOfSeparationReferenceModule: {
                    commentsRestricted: false,
                    mirrorsRestricted: false,
                    degreesOfSeparation: 0
                  }
                })
              }
              className={clsx(
                'flex items-center text-left justify-between w-full px-4 py-2 text-sm border border-gray-200 hover:!border-indigo-500 focus:outline-none dark:border-gray-800 rounded-xl',
                {
                  '!border-indigo-500':
                    uploadedVideo.referenceModule?.followerOnlyReferenceModule
                }
              )}
            >
              <span>Only my subscribers</span>
              {uploadedVideo.referenceModule?.followerOnlyReferenceModule && (
                <AiOutlineCheck className="flex-none" />
              )}
            </button>
          </div>
          <Tooltip content="Channels you subscribed, their subscriptions and so on upto 4 levels can comment and mirror">
            <button
              type="button"
              onClick={() =>
                setReferenceType({
                  followerOnlyReferenceModule: false,
                  degreesOfSeparationReferenceModule: {
                    commentsRestricted: true,
                    mirrorsRestricted: true,
                    degreesOfSeparation: 4
                  }
                })
              }
              className={clsx(
                'flex items-center text-left justify-between w-full px-4 py-2 text-sm border border-gray-200 hover:!border-indigo-500 focus:outline-none dark:border-gray-800 rounded-xl',
                {
                  '!border-indigo-500':
                    uploadedVideo.referenceModule
                      ?.degreesOfSeparationReferenceModule
                      ?.degreesOfSeparation === 4
                }
              )}
            >
              <span>
                My subscriptions and channels 4 degrees away in their network
              </span>
              {uploadedVideo.referenceModule?.degreesOfSeparationReferenceModule
                ?.degreesOfSeparation === 4 && (
                <AiOutlineCheck className="flex-none" />
              )}
            </button>
          </Tooltip>
          <div className="flex justify-end">
            <Button type="button" onClick={() => setShowModal(false)}>
              Set Preference
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ReferenceModuleType