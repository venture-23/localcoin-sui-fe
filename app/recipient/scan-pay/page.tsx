'use client';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

import Link from 'next/link';
export default function ScanPay() {
  const [imageUrl, setImageUrl] = useState('');
  // const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const { push } = useRouter();

  useEffect(() => {
    generateQrCode();
  }, []);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL('this is address of user');
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleErrorFile = (error) => {
  //   console.log(error);
  // };
  // const handleScanFile = (result) => {
  //   if (result) {
  //     setScanResultFile(result);
  //   }
  // };
  // const onScanFile = () => {
  //   console.log(qrRef.current, 'current');
  //   qrRef.current.openImageDialog();
  // };
  const handleErrorWebCam = (error: any) => {
    console.log(error);
  };
  const handleScanWebCam = (result: string) => {
    if (result) {
      setScanResultWebCam('result');
      push('/recipient/confirmation');
    }
  };
  return (
    <>
      {/* <Header className="h-[120px]"> */}
      <div className="flex items-center">
        <Link href="/recipient">{'<-'}</Link>
      </div>
      {/* </Header> */}
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            handleScanWebCam(result?.text);
          }

          if (!!error) {
            handleErrorWebCam(error);
          }
        }}
        scanDelay={300}
        style={{ width: '100%' }}
      />
      <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
      {imageUrl ? <img src={imageUrl} alt="img" style={{ width: '100%' }} /> : null}
    </>
  );
}
