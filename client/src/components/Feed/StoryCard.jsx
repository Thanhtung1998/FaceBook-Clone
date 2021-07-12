// import Image from "next/image"


function StoryCard({ name, src, profile }) {
    return (

        <div className="relative h-14 w-14 md:h-20 md:w-20
        lg:h-56 lg:w-32 cursor-pointer overflow-x p-3 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse 
        ">
            <img alt="avatar" className="absolute  opacity-0 lg:opacity-100 w-10 h-10 rounded-full z-50 object-cover"
                key={name}
                src={profile}
            />
            <img alt="avatar" className="stories fixed "
                // style={{ minWidth: "128px", height: "224px" }}
                width={30} height={30} layout="fixed"
                src={src}
            // layout="fill"
            />
            <p className="absolute opacity-0 lg:opacity-100 bottom-4 w-5/6 text-white text-sm font-bold truncate">{name}</p>
        </div>

    )
}

export default StoryCard
