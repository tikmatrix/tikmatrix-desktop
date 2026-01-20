import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="Tentang Kami"
            description="Pelajari lebih lanjut tentang TikMatrix - siapa kami, misi, dan visi kami">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>Tentang Kami</h1>

                    <h2>Profil Perusahaan</h2>
                    <p>TikMatrix dikembangkan oleh TikMatrix LLC yang terdaftar di negara bagian Wyoming, Amerika Serikat. Sejak didirikan, kami telah berkomitmen untuk menciptakan alat pemasaran media sosial yang inovatif untuk membantu bisnis dan pembuat konten memaksimalkan pengaruh online mereka.</p>

                    <h2>Misi Kami</h2>
                    <p>Misi kami adalah mengembangkan alat pemasaran media sosial yang kuat dan mudah digunakan untuk membantu bisnis dari semua ukuran mengembangkan kehadiran online mereka secara efisien. Kami berusaha membuat teknologi pemasaran canggih dapat diakses oleh semua orang.</p>

                    <h2>Produk Kami</h2>
                    <p>Produk unggulan kami, TikMatrix, dirancang khusus untuk manajemen akun TikTok profesional dan otomasi pemasaran. Kami juga menawarkan alat pelengkap untuk platform lain:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - Alat profesional untuk manajemen akun TikTok dan pemasaran</li>
                        <li><strong>IgMatrix</strong> - Solusi pemasaran dan manajemen akun Instagram</li>
                        <li><strong>VideoMagic</strong> - Alat pembuatan dan optimasi konten video</li>
                        <li><strong>YtMatrix</strong> - Platform pertumbuhan dan manajemen saluran YouTube</li>
                    </ul>

                    <h2>Teknologi Kami</h2>
                    <p>Di TikMatrix, kami menggunakan teknologi terdepan untuk menyediakan alat pemasaran media sosial yang andal, efisien, dan aman. Tim pengembangan kami terus bekerja untuk meningkatkan produk dan menggabungkan inovasi industri terbaru, memastikan pengguna kami selalu mendapatkan alat pemasaran terbaik.</p>

                    <h2>Nilai-Nilai Kami</h2>
                    <p>Kami sangat percaya pada:</p>
                    <ul>
                        <li><strong>Inovasi</strong> - Terus meningkatkan produk kami untuk memenuhi kebutuhan pasar yang berubah</li>
                        <li><strong>Keandalan</strong> - Memastikan alat kami beroperasi secara stabil dan aman</li>
                        <li><strong>Aksesibilitas</strong> - Menyediakan alat pemasaran canggih untuk bisnis dari semua ukuran</li>
                        <li><strong>Kesuksesan Pelanggan</strong> - Memprioritaskan pertumbuhan dan pencapaian pengguna</li>
                    </ul>

                    <h2>Bergabunglah dengan Kami</h2>
                    <p>Baik Anda pemilik usaha kecil, pembuat konten, atau profesional pemasaran, TikMatrix menyediakan alat yang Anda butuhkan untuk sukses di lingkungan media sosial yang kompetitif saat ini. Tim kami berkomitmen untuk membantu Anda mencapai tujuan pemasaran dan memperluas kehadiran online Anda.</p>

                    <h2>Hubungi Kami</h2>
                    <p>Punya pertanyaan atau butuh bantuan? Kami siap membantu!</p>
                    <p>Email: support@tikmatrix.com</p>
                    <p>Bergabunglah dengan komunitas kami: <a href="https://t.me/tikmatrix_agent_bot">Grup Dukungan Telegram</a></p>
                </div>
            </div>
        </Layout>
    );
}