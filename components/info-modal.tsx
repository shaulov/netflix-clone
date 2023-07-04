import { useState, useCallback, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./play-button";
import FavoriteButton from "./favorite-button";
import useInfoModal from "@/hooks/use-info-modal";
import useMovie from "@/hooks/use-movie";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
};

function InfoModal ({ visible, onClose }: InfoModalProps): JSX.Element | null {
  const [isVisible, setVisible] = useState(visible);

  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }
  
  return (
    <div
      className="
        fixed z-50 inset-0
        flex justify-center items-center
        bg-black bg-opacity-80
        overflow-x-hidden overflow-y-auto
        transition duration-300
      "
    >
      <dialog open={visible}
        className="
          relative
          w-auto max-w-3xl mx-auto p-0
          rounded-md
          overflow-hidden
        "
      >
        <div className={`
          relative
          flex-auto
          bg-zinc-900
          drop-shadow-md
          ${isVisible ? 'scale-100' : 'scale-0'}
          transform duration-300
        `}>
          <div className="relative h-96">
            <video 
              className="
                w-full h-full
                object-cover
                brightness-[60%]
              " 
              autoPlay muted loop 
              poster={data?.thumbnailUrl} src={data?.videoUrl}
            ></video>
            <button 
              className="
                absolute top-3 right-3
                flex items-center justify-center
                w-10 h-10
                bg-black bg-opacity-70
                rounded-full
              " 
              onClick={handleClose}
            >
              <AiOutlineClose size={20} />
            </button>
            <div className="absolute bottom-[10%] left-10">
              <p className="h-full mb-8 text-3xl md:text-4xl lg:text-5xl font-bold">
                {data?.title}
              </p>
              <div className="flex flex-row items-center gap-4">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <p className="text-lg font-semibold text-green-400">New</p>
            <p className="text-lg">{data?.duration}</p>
            <p className="text-lg">{data?.genre}</p>
            <p className="text-lg">{data?.description}</p>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default InfoModal;