'use client';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { ArrowDownOnSquareStackIcon, QrCodeIcon, ShareIcon } from '@heroicons/react/24/outline';
import Button from 'components/botton';
import PopupBox from 'components/popover';
import { useMyContext } from 'hooks/useMyContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import { shareOnMobile } from 'react-mobile-share';
import { QrReader } from 'react-qr-reader';

export default function ScanPayMerchant() {
  const [imageUrl, setImageUrl] = useState('');
  const { userInfo } = useMyContext();

  // const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const { push } = useRouter();
  const popOverRef = useRef<any>(null);

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const cameraRef = useRef();

  useEffect(() => {
    generateQrCode();
  }, []);

  const generateQrCode = async () => {
    try {
      const staticData = {
        type: 'receipient',
        publicKey: userInfo.publicKey,
        secretKey: userInfo.secretKey
      };
      // debugger;
      const response = await QRCode.toDataURL(JSON.stringify(staticData));
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
      // close();
      push('/recipient/confirmation');
    }
  };
  // async function close() {
  //   console.log('closing');
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     audio: false,
  //     video: true
  //   });
  //   stream.getTracks().forEach(function (track) {
  //     track.stop();
  //     track.enabled = false;
  //   });
  //   cameraRef.current.remove();
  // }
  const validBase64 = (url: string) => {
    return 'data:image/jpeg;base64,' + url.split(',')[1];
  };
  const downloadBase64File = async (fileName: string) => {
    const imgBase64 = imageUrl;
    const linkSource = `${imgBase64}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <>
      {/* <Header className="h-[120px]"> */}
      <div className=" absolute top-12 z-[10] mx-auto w-[95%] ">
        <div className="flex items-center justify-between">
          <p className="flex-1 text-center text-white">Scan QR code to pay</p>
          <Link href="/recipient" className="flex items-center justify-center rounded-full ">
            <XCircleIcon width={24} height={24} color="white" />
          </Link>
        </div>
      </div>
      {/* </Header> */}
      <div ref={cameraRef}>
        <QrReader
          // className="hello"
          onResult={(result, error) => {
            if (!!result) {
              console.log({ result: result.text });
              handleScanWebCam(result?.text);
            }

            if (!!error) {
              handleErrorWebCam(error);
            }
          }}
          scanDelay={500}
          constraints={{ facingMode: 'environment' }}
          containerStyle={{ paddingTop: '0' }}
          videoContainerStyle={{ width: '100%', height: '100vh', paddingTop: '0' }}
          videoStyle={{
            height: '100%',
            width: '100%',
            objectFit: 'cover'
          }}
        />

        <span
          className="try-css bg-tranparent absolute inset-0 m-auto h-[200px] w-1/2 rounded-md border-2 border-white  
        shadow-[0_4px_0px_500px_rgba(0,0,0,0.5)] "
        ></span>

        {/* <span className="absolute inset-0 w-full h-full font-bold bg-black/5"></span> */}
      </div>
      {/* <h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
      {/* {imageUrl ? <img src={imageUrl} alt="img" style={{ width: '100%' }} /> : null} */}

      {imageUrl ? (
        <>
          <div
            className="fixed bottom-7 right-7 md:absolute"
            onClick={() => popOverRef.current.open({ title: 'Share QR Code', imageUrl })}
          >
            <Link
              // href={asPath.includes('recipient') ? '/recipient/scan-pay' : '/merchant/scan-pay'}
              href=""
              className="flex w-fit items-center gap-2 rounded-full bg-blue-500 px-6 py-3"
            >
              <QrCodeIcon className="h-6 w-6 text-white" />
              <span className="text-base font-semibold text-white">Share QR</span>
            </Link>
          </div>
          <PopupBox ref={popOverRef}>
            <>
              <a href={imageUrl} download className="w-full">
                <Button
                  handleClick={() => downloadBase64File('ScanToPay')}
                  buttonIcon={<ArrowDownOnSquareStackIcon width={24} height={24} />}
                  text="Save Image"
                />
              </a>
              <Button
                handleClick={() => {
                  const imgBase64 = validBase64(imageUrl);

                  shareOnMobile(
                    {
                      text: 'Scan to make payment',
                      url: 'https://localcoin-mobileapp.vercel.app/merchant',
                      title: 'Scan to Pay',
                      images: [imgBase64]
                    },
                    (message) => alert(message)
                  );
                }}
                text="Share"
                buttonType="secondary"
                buttonIcon={<ShareIcon width={24} height={24} />}
              />
            </>
          </PopupBox>

          {/* <Drawer open={open} setOpen={setOpen} panelTitle="Share your QR Code">
            <img src={imageUrl} alt="img" style={{ width: '100%' }} />
          </Drawer> */}
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
