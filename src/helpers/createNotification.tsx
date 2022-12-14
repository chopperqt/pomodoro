import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";

interface CreateNotificationProps {
  text: string;
  title?: string;
  icon?: string;
}

export const createNotification = async ({
  text,
  title = "Pomodoro",
}: CreateNotificationProps) => {
  let permissionGranted = await isPermissionGranted();

  if (!permissionGranted) {
    const permission = await requestPermission();

    permissionGranted = permission === "granted";
  }

  if (!permissionGranted) {
    return;
  }

  sendNotification({
    body: text,
    title,
  });
};
