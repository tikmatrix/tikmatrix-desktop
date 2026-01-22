import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Kebijakan Privasi"
            description="Kebijakan Privasi TikMatrix - Bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Kebijakan Privasi</h1>
                    <p>Terakhir diperbarui: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Pendahuluan</h2>
                    <p>Selamat datang di TikMatrix ("kami", "milik kami", atau "perusahaan"). Kami berkomitmen untuk melindungi informasi pribadi Anda dan hak privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi Anda ketika Anda mengunjungi situs web kami atau menggunakan layanan kami.</p>

                    <h2>2. Informasi yang Kami Kumpulkan</h2>
                    <p>Kami dapat mengumpulkan beberapa jenis informasi dari dan tentang pengguna situs web dan layanan kami, termasuk:</p>
                    <ul>
                        <li><strong>Informasi Pribadi:</strong> Nama, alamat email, nomor telepon, dan pengenal lainnya yang Anda berikan saat mendaftar layanan kami atau berkomunikasi dengan kami.</li>
                        <li><strong>Informasi Teknis:</strong> Alamat IP, jenis browser, sistem operasi, dan detail teknis lainnya saat Anda mengunjungi situs web kami.</li>
                        <li><strong>Informasi Penggunaan:</strong> Bagaimana Anda berinteraksi dengan situs web dan layanan kami, termasuk fitur yang digunakan dan waktu yang dihabiskan.</li>
                    </ul>

                    <h2>3. Bagaimana Kami Menggunakan Informasi Anda</h2>
                    <p>Kami dapat menggunakan informasi yang kami kumpulkan untuk berbagai tujuan, termasuk:</p>
                    <ul>
                        <li>Menyediakan, mengoperasikan, dan memelihara layanan kami</li>
                        <li>Meningkatkan dan mempersonalisasi pengalaman Anda</li>
                        <li>Berkomunikasi dengan Anda tentang pembaruan, dukungan, dan promosi</li>
                        <li>Menganalisis pola penggunaan untuk meningkatkan layanan kami</li>
                        <li>Mencegah penipuan dan memastikan keamanan</li>
                    </ul>

                    <h2>4. Berbagi dan Pengungkapan Informasi</h2>
                    <p>Kami dapat membagikan informasi Anda dalam situasi berikut:</p>
                    <ul>
                        <li><strong>Penyedia Layanan:</strong> Dengan pihak ketiga yang membantu kami mengoperasikan bisnis dan memberikan layanan.</li>
                        <li><strong>Persyaratan Hukum:</strong> Ketika diwajibkan oleh hukum atau untuk melindungi hak kami atau keselamatan pengguna.</li>
                        <li><strong>Transfer Bisnis:</strong> Sehubungan dengan merger, akuisisi, atau penjualan aset.</li>
                    </ul>

                    <h2>5. Keamanan Data</h2>
                    <p>Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda. Namun, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman, dan kami tidak dapat menjamin keamanan absolut.</p>

                    <h2>6. Hak Anda</h2>
                    <p>Tergantung pada lokasi Anda, Anda mungkin memiliki hak tertentu terkait informasi pribadi Anda, termasuk:</p>
                    <ul>
                        <li>Mengakses informasi pribadi Anda</li>
                        <li>Memperbaiki informasi pribadi yang tidak akurat</li>
                        <li>Menghapus informasi pribadi Anda</li>
                        <li>Menolak aktivitas pemrosesan tertentu</li>
                        <li>Portabilitas data</li>
                    </ul>

                    <h2>7. Privasi Anak-anak</h2>
                    <p>Layanan kami tidak ditujukan untuk individu di bawah usia 16 tahun. Kami tidak dengan sengaja mengumpulkan informasi pribadi dari anak-anak.</p>

                    <h2>8. Perubahan pada Kebijakan Privasi Ini</h2>
                    <p>Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini dan memperbarui tanggal "Terakhir diperbarui".</p>

                    <h2>9. Hubungi Kami</h2>
                    <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di:</p>
                    <p>Email: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 