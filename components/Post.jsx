import Image from "next/image";
import Link from "next/link";
export default function Post({ id = '', img = '', name = '', title = '' }) {
    return (
        <div >
            <div className="flex items-center">
                <span>
                    <Image
                        className="rounded-full m-4"
                        src={img}
                        width={30}
                        height={30}
                        alt='profile'
                    />
                </span>
                <span className="font-bold text-lg text-blue-700">
                    {name}
                </span>
            </div>
            <div className="ml-4 font-bold text-3xl text-black">
                <Link href={`/currentpost/${id}`}>
                    {title}
                </Link>
            </div>
        </div>
    )
}
