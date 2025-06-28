import { useEffect } from 'react'
import {
  isPermissionGranted,
  sendNotification,
  requestPermission,
} from '@tauri-apps/plugin-notification'

const hasNotificationPermission = await isPermissionGranted()

interface NotificationOptions {
  title: string
  body: string
}

export const useNotification = () => {
  useEffect(() => {
    if (hasNotificationPermission) return

    requestPermission()
  }, [])

  const onSendNotification = ({
    title,
    body,
  }: NotificationOptions) => {
    if (!hasNotificationPermission) return

    sendNotification({
      title,
      body,
    })
  }

  return {
    onSendNotification,
  }
}
