import { AiOutlineInfoCircle } from "react-icons/ai";
import useBillboard from "@/hooks/use-billboard";
import PlayButton from "./play-button";
import { useCallback } from "react";
import useInfoModal from "@/hooks/use-info-modal";

function Billboard (): JSX.Element {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <section className="relative h-[56.25vw]">
      <h2 className="sr-only">Offer you a look at</h2>
      <video 
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        poster={data?.thumbnailUrl} 
        src={data?.videoUrl}
        autoPlay
        muted
        loop
      >
      </video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <h3 className="h-full w-[50%] font-bold text-1xl md:text-5xl lg:text-6xl text-white drop-shadow-xl">{data?.title}</h3>
        <p className="w-[90%] md:w-[80%] lg:w-[50%] mt-3 md:mt-8 text-[8px] md:text-lg text-white drop-shadow-xl">{data?.description}</p>
        <div className="flex flex-row items-center gap-3 mt-3 md:mt-4">
          <PlayButton movieId={data?.id} />
          <button
            className="
              flex
              flex-row
              items-center
              w-auto
              px-2 md:px-4
              py-1 md:py-2
              font-semibold
              text-xs lg:text-lg
              text-white
              bg-white
              bg-opacity-30
              rounded-md
              transition
              hover:bg-opacity-20
            "
            onClick={handleOpenModal}
          >
            <AiOutlineInfoCircle className="box-content mr-1 py-[6px]" size={13} />
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}

export default Billboard