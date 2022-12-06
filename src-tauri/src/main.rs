#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTray};

#[tauri::command]
fn set_icon(app_handle: tauri::AppHandle, name: &str) {
    match name {
        "notification" => app_handle
            .tray_handle()
            .set_icon(tauri::Icon::Raw(
              include_bytes!("../icons/StoreLogo.png").to_vec(),
            ))
            .unwrap(),
        "start" => app_handle
            .tray_handle()
            .set_icon(tauri::Icon::Raw(
              include_bytes!("../icons/tray/pomodoro-start.png").to_vec()
            ))
            .unwrap(),
        "timeout" => app_handle
            .tray_handle()
            .set_icon(tauri::Icon::Raw(
              include_bytes!("../icons/tray/pomodoro-timeout.png").to_vec()
            ))
            .unwrap(),
        _ => app_handle
            .tray_handle()
            .set_icon(tauri::Icon::Raw(
                include_bytes!("../icons/32x32.png").to_vec(),
            ))
            .unwrap(),
    };
}

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let tray_menu = SystemTrayMenu::new()
    .add_item(quit)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(hide);
  let tray = SystemTray::new().with_menu(tray_menu);

  tauri::Builder::default()
    .system_tray(tray)
    .invoke_handler(tauri::generate_handler![
      set_icon,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
    
}
