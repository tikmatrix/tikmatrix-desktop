$env:MATRIX_APP_WORK_DIR = "C:\Users\Administrator\AppData\Roaming\com.tikmatrix"
$env:MATRIX_APP_NAME = "TikMatrix"
$env:RUST_BACKTRACE=1
taskkill /F /IM agent.exe
& "C:\Users\Administrator\AppData\Roaming\com.tikmatrix\bin\agent.exe"
