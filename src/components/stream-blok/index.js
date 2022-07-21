import { AnnouncementBlock, AnnouncementTitle } from '../stream/atoms'
import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const AnnouncementSection = ({data, modal, setCurrentSchedule}) => {
  const {t} = useTranslation()
  //
  // const deleteAnnouncement = () => {
  //     stream.deleteAnnouncementChannel(channel, data.id)
  //         .then(response => {
  //             if (response.status === 204){
  //                 removeSchedule(data.id)
  //             }
  //         })
  //         .catch(error => console.error(error.response))
  // }

  moment(new Date()) > moment(data.date) && setCurrentSchedule(data)

  return (
    <AnnouncementBlock>
      <img
        src={data.image}
        alt={data.title} />
      <AnnouncementTitle>
        {
          data.title
        }
        <span>
                    {
                      t('announce_start') + moment(data.date).format('HH:mm')
                    }
                </span>
      </AnnouncementTitle>

    </AnnouncementBlock>
  )
}