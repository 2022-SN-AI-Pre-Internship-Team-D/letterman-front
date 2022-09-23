import 'tailwindcss/tailwind.css';
import React, { useState } from 'react';
import ColorSystem from 'utils/ColorSystem';
import postcard from 'images/postcard.png';
import mic from 'images/mic.png';
import ResultModal from 'components/ResultModal';
import { useLocation } from 'react-router';
import axios from 'axios';

interface mailForm {
  text: FormDataEntryValue;
  file: FormDataEntryValue | undefined;
  media: FormDataEntryValue | undefined;
}

function MailWritePage() {
  const [imgFile, setImgFile] = useState<File>();
  const { state } = useLocation();

  console.log(state);
  const mailData: mailForm = {
    text: 'adfs',
    file: imgFile,
    media: imgFile,
  };
  console.log(mailData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state[1] === 'birth') {
      axios
        .post(`/letters/users/${state[0]}/birth/write`, mailData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          console.log(res);
          handleModal();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`/letters/users/${state[0]}/events/${state[1]}/write`, mailData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          console.log(res);
          handleModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const onChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgFile(event.target.files![0]);
  };

  const hiddenFileInput = React.useRef<any | null>(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file

  // ⭕️
  const handleModal = () => {
    setModalOC(true);
  };

  const [modalOC, setModalOC] = useState(false);
  // ⭕️

  return (
    <div
      className="flex justify-center items-center h-screen py-20 flex-col"
      style={{ backgroundColor: ColorSystem.MainColor.Primary }}
    >
      <form
        className="rounded-xl flex flex-col items-center bg-white p-4 md:w-1/6"
        style={{ height: '50rem', width: '38rem' }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <img src={postcard} alt="postcard" className="w-24" />
        <p className="italic font-serif text-xl">dear toto</p>
        <div className="flex flex-row mt-3">
          {/* 음성녹음 */}
          <button type="button">
            <img src={mic} alt="mic" className="" />
          </button>
          {/* 녹음 확인 */}
          {/* <button className="mt-1.5" type="button">
            <img src={check} alt='check' className="" />
          </button> */}
          <button type="button" className="rounded-xl bg-subBackground" style={{ height: '3rem', width: '13rem' }}>
            녹음 결과 확인
          </button>
        </div>
        <div>
          <button type="button" onClick={handleClick} className="m-10 mt-5 w-96 h-48 rounded-xl bg-subBackground">
            +<input ref={hiddenFileInput} type="file" hidden onChange={onChangeImage} className="" />
          </button>
        </div>
        <div
          className=" text-center bg-[url('images/letterbg.png')] rounded-lg h-fit "
          style={{ width: '580px', height: '20rem' }}
        >
          <textarea
            placeholder="To.."
            cols={45}
            rows={6}
            maxLength={300}
            className="p-4 h-56 rounded-lg bg-transparent text-xl leading-9 focus:outline-none "
            style={{ width: '530px', resize: 'none' }}
          />
        </div>
        <button type="submit" className=" bg-white px-10 py-2 mt-5 rounded-full border-4 border-subBackground">
          {' '}
          전송
        </button>
      </form>

      <ResultModal openinit={modalOC} closeModal={() => setModalOC(false)} id={state[0]} />
    </div>
  );
}
export default MailWritePage;
