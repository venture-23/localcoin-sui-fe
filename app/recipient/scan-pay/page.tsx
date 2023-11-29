'use client';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function ScanPay() {
  const [imageUrl, setImageUrl] = useState('');
  // const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  // const qrRef = useRef(null);

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
  //   qrRef.current.openImageDialog();
  // };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };
  return (
    <>
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
