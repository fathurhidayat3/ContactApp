# ContactApp
Aplikasi Kontak dibuat dengan React Native (Expo). 

![license](https://img.shields.io/badge/license-MIT-blue.svg)

### Fitur
  - Persistent Login dengan AsyncStorage 
  - Autoredirect ke HomePage jika sudah terautentikasi / token masih valid
  - Paginasi Contact List
  - Limit jumah Contact Item sesuai dimensi device 
    - Dicoba di layar 4inches(Samsung Galaxy S Duoas) dan 5.5inches(Xiaomi Redmi Note 3 Pro)

### Dependency 
  - Expo built-in (react-native, react-navigation, vector-icons, dll)
  - Formik 
  - Yup 

### Demo Aplikasi
  - Unduh aplikasi (.apk) [di sini](https://drive.google.com/open?id=1dlg6kuiRFbPXCqjbj7IgJ4rBcAJIsXxP)
  - Matikan koneksi internet
  - Bersihkan cache aplikasi 
  - Buka file .apk, apabila muncul beberapa prompt/window yang meminta persetujuan silahkan tekan izinkan/lanjutkan/tetap install

### Development Mode
  - Pastikan di machine sudah terinstall [Node.js](https://nodejs.org/en/) dengan versi 10 ke atas. Untuk memastikan Node.js terinstall eksekusi perintah :
```sh
    node --version
```
  - Dan juga [expo-cli](https://docs.expo.io/versions/v32.0.0/introduction/installation/) untuk mengeksekusi perintah yang diperlukan untuk proses pengembangan. Pastikan instalasi berhasil dengan perintah :
```sh
    expo --version
```
  - Clone repo ini
  - Buka terminal/command-prompt, arahkan direktori ke repo ini, lalu untuk menginstall dependency yang dibutuhkan oleh project, jalankan :
```sh
    npm install
```
  - Gunakan perintah di bawah untuk memulai development server. Secara otomatis akan membuka tab baru di browser default Anda yang menampilkan log development dan QR code untuk preview.
```sh
    expo start
```
  - Apabila ingin melakukan preview aplikasi di device, silahkan install Expo Client. Untuk Android dapat diunduh di [download Expo Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www).
  - Buka Expo Client lalu pilih Scan QR Code dan arahkan ke bagian kiri bawah Expo Dev Server di browser. Tunggu proses binding ke device hingga muncul splash screen.
  
### Lisensi
Aplikasi ini berlisensi di bawah [MIT](https://choosealicense.com/licenses/mit/).
