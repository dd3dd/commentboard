import Image from "next/image";
export default function Comment({ imgSrc = '', comment = '', name = '' }) {
    return (
        <div className="h-12 flex justify-start items-center shadow-md my-4">
            <Image
                className="rounded-full m-4"
                src={imgSrc}
                width={30}
                height={30}
            />
            <div>
                <p className="font-bold text-lg text-blue-700 ">{name}</p>
                <p className="">{comment}</p>
            </div>

        </div>
    )
}