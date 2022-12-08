#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTray, SystemTrayEvent};

#[tauri::command]
fn set_icon(app_handle: tauri::AppHandle, name: &str) {
    match name {
        "pause" => app_handle
            .tray_handle()
            .set_icon(tauri::Icon::Raw(
              include_bytes!("../icons/tray/pomodoro-pause.png").to_vec(),
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
                include_bytes!("../icons/tray/pomodoro-pause.png").to_vec(),
            ))
            .unwrap(),
    };
}

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let tray_menu = SystemTrayMenu::new()
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit);
  let tray = SystemTray::new().with_menu(tray_menu);

  tauri::Builder::default()
    .system_tray(tray)
    .on_system_tray_event(move |app, event| match event {
      SystemTrayEvent::DoubleClick {
          position: _,
          size: _,
          ..
      } => {
          
      }
      SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
          "quit" => {
              std::process::exit(0);
          }
          "show" => {
              let w = app.get_window("main").unwrap();
              w.show().unwrap();

              // because the window shows in a specific workspace and the user
              // can hide it and move to another, it will next show in the original
              // workspace it was opened in.
              // this is important for the window to always show in whatever workspace
              // the user moved to and is active in.
              w.set_focus().unwrap();
          }

          _ => {}
      },
      _ => {}
  })
    .invoke_handler(tauri::generate_handler![
      set_icon,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
    
}
