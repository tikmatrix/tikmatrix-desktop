import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Ketentuan Layanan"
            description="Ketentuan Layanan TikMatrix - Aturan dan pedoman untuk menggunakan platform kami">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Ketentuan Layanan</h1>
                    <p>Terakhir diperbarui: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Penerimaan Ketentuan</h2>
                    <p>Dengan mengakses atau menggunakan situs web dan layanan TikMatrix, Anda setuju untuk terikat oleh Ketentuan Layanan ini dan semua hukum dan peraturan yang berlaku. Jika Anda tidak setuju dengan salah satu ketentuan ini, Anda dilarang menggunakan atau mengakses situs ini.</p>

                    <h2>2. Lisensi Penggunaan</h2>
                    <p>Izin diberikan untuk mengunduh sementara satu salinan materi di situs web TikMatrix hanya untuk tampilan pribadi, non-komersial dan sementara. Ini adalah pemberian lisensi, bukan transfer kepemilikan, dan di bawah lisensi ini Anda tidak boleh:</p>
                    <ul>
                        <li>Memodifikasi atau menyalin materi</li>
                        <li>Menggunakan materi untuk tujuan komersial apa pun atau untuk tampilan publik</li>
                        <li>Mencoba merekayasa balik perangkat lunak apa pun yang terdapat di situs web TikMatrix</li>
                        <li>Menghapus hak cipta atau notasi kepemilikan lainnya dari materi</li>
                        <li>Mentransfer materi ke orang lain atau "mencerminkan" materi di server lain</li>
                    </ul>
                    <p>Lisensi ini akan otomatis berakhir jika Anda melanggar salah satu pembatasan ini dan dapat dihentikan oleh TikMatrix kapan saja.</p>

                    <h2>3. Layanan dan Langganan</h2>
                    <p>TikMatrix menyediakan alat perangkat lunak untuk manajemen akun TikTok dan otomasi pemasaran. Akses ke layanan ini mungkin memerlukan langganan atau pembayaran satu kali. Dengan berlangganan layanan kami, Anda setuju untuk:</p>
                    <ul>
                        <li>Selama periode uji coba, Anda dapat membatalkan langganan kapan saja. Jika langganan tidak dibatalkan, langganan akan otomatis dikonversi menjadi langganan berbayar.</li>
                        <li>Memberikan informasi penagihan yang akurat dan lengkap</li>
                        <li>Membayar semua biaya dengan tarif yang berlaku saat biaya dikenakan</li>
                        <li>Tidak menggunakan layanan untuk tujuan ilegal atau yang melanggar hukum atau peraturan yang berlaku</li>
                    </ul>

                    <h2>4. Perilaku Pengguna</h2>
                    <p>Saat menggunakan layanan kami, Anda setuju untuk tidak:</p>
                    <ul>
                        <li>Melanggar hukum atau peraturan yang berlaku</li>
                        <li>Melanggar hak orang lain</li>
                        <li>Mendistribusikan malware atau terlibat dalam aktivitas berbahaya lainnya</li>
                        <li>Mencoba mendapatkan akses tidak sah ke sistem kami atau akun pengguna lain</li>
                        <li>Menggunakan layanan kami dengan cara yang dapat merusak, menonaktifkan, membebani secara berlebihan, atau mengganggu layanan kami</li>
                    </ul>

                    <h2>5. Kekayaan Intelektual</h2>
                    <p>Nama, logo, perangkat lunak, dan konten TikMatrix adalah milik eksklusif TikMatrix dan pemberi lisensinya. Layanan kami dan semua konten yang disertakan atau tersedia melalui layanan kami dilindungi oleh hukum kekayaan intelektual.</p>

                    <h2>6. Penafian</h2>
                    <p>Materi di situs web TikMatrix dan layanan yang disediakan dipasok "sebagaimana adanya". TikMatrix tidak memberikan jaminan apa pun, tersurat maupun tersirat, dan dengan ini menyangkal semua jaminan lainnya, termasuk tanpa batasan, jaminan tersirat tentang kelayakan jual atau kesesuaian untuk tujuan tertentu.</p>

                    <h2>7. Batasan Tanggung Jawab</h2>
                    <p>Dalam hal apa pun TikMatrix atau pemasoknya tidak akan bertanggung jawab atas kerusakan apa pun yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan materi atau layanan, bahkan jika TikMatrix telah diberitahu tentang kemungkinan kerusakan tersebut.</p>

                    <h2>8. Hukum yang Mengatur</h2>
                    <p>Ketentuan ini akan diatur oleh dan ditafsirkan sesuai dengan hukum yurisdiksi di mana TikMatrix didirikan, tanpa memperhatikan ketentuan konflik hukumnya.</p>

                    <h2>9. Perubahan pada Ketentuan</h2>
                    <p>TikMatrix berhak untuk mengubah Ketentuan ini kapan saja. Kami akan memberi tahu pengguna tentang perubahan apa pun dengan memperbarui tanggal "Terakhir diperbarui" dari Ketentuan ini. Penggunaan berkelanjutan Anda atas situs web dan layanan kami setelah perubahan apa pun menunjukkan penerimaan Anda terhadap Ketentuan yang dimodifikasi.</p>

                    <h2>10. Hubungi Kami</h2>
                    <p>Jika Anda memiliki pertanyaan tentang Ketentuan ini, silakan hubungi kami di:</p>
                    <p>Email: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 