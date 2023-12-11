'use client';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import Drawer from 'components/drawer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function ScanPayMerchant() {
  const [imageUrl, setImageUrl] = useState('');
  // const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    generateQrCode();
  }, []);

  const generateQrCode = async () => {
    try {
      // debugger;
      const response = await QRCode.toDataURL('this is address of user');
      setImageUrl(response);
    } catch (error) {
      // debugger;
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
      close;
      push('/merchant/confirmation');
    }
  };
  async function close() {
    console.log('closing');
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });
    stream.getTracks().forEach(function (track) {
      track.stop();
      track.enabled = false;
    });
    cameraRef.current.stopCamera();
  }

  return (
    <>
      {/* <Header className="h-[120px]"> */}
      <div className=" absolute top-12 z-[10] mx-auto w-[95%] ">
        <div className="flex items-center justify-between">
          <p className="flex-1 text-center">Scan QR code to pay</p>
          <Link href="/recipient" className="">
            {'X'}
          </Link>
        </div>
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
        containerStyle={{ paddingTop: '0' }}
        constraints={{ facingMode: 'rear' }}
        videoContainerStyle={{ width: '100%', height: '100vh', paddingTop: '0' }}
        ref={{ cameraRef }}
        videoStyle={{
          height: '100%',
          width: '100%',
          objectFit: 'cover'
        }}
      />
      {/* <h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
      {/* {imageUrl ? <img src={imageUrl} alt="img" style={{ width: '100%' }} /> : null} */}

      {imageUrl ? (
        <>
          <div className="fixed bottom-7 right-7 " onClick={() => setOpen(true)}>
            <Link
              // href={asPath.includes('recipient') ? '/recipient/scan-pay' : '/merchant/scan-pay'}
              href=""
              className="flex w-fit items-center gap-2 rounded-full bg-blue-500 px-6 py-3"
            >
              <QrCodeIcon className="h-6 w-6 text-white" />
              <span className="text-base font-semibold text-white">Share QR</span>
            </Link>
          </div>

          <Drawer open={open} setOpen={setOpen} panelTitle="Share your QR Code">
            <img src={imageUrl} alt="img" style={{ width: '100%' }} />
          </Drawer>
          {/* <BottomSheet divClass="!h-[100vh]">
            <div className="container mx-auto">
              <p className="pt-4 text-center "> Swipe or click to share QR code </p>
              <img src={imageUrl} alt="img" style={{ width: '100%' }} />
            </div>
          </BottomSheet> */}
          {/* <Drawer /> */}
        </>
      ) : null}
    </>
  );
}
