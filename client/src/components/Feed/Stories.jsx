import StoryCard from "./StoryCard"


const stories = [
    {
        name: "Jennie",
        src: "https://i.pinimg.com/564x/74/70/cd/7470cd9721b6831f973a2280e631b8cc.jpg",
        profile: "https://i.pinimg.com/564x/29/5b/aa/295baae25472d1f5321659d1f8b11de8.jpg",
    },
    {
        name: "Yua Mikami",
        src: "https://i.pinimg.com/564x/c2/1e/dd/c21eddf0e716b201496b32bf95622fb8.jpg",
        profile: "https://i.pinimg.com/564x/c2/1e/dd/c21eddf0e716b201496b32bf95622fb8.jpg",
    },
    {
        name: "Cristiano Ronaldo",
        src: "https://i.pinimg.com/564x/77/92/07/7792075307c9ffce77574c2547004f0b.jpg",
        profile: "https://i.pinimg.com/564x/e9/2b/26/e92b269a1ba428816c39b50b3e175afa.jpg",
    },
    {
        name: "Leo Messi",
        src: "https://i.pinimg.com/564x/63/73/16/637316c1b91b454fdbd8d724aa6eb0c8.jpg",
        profile: "https://i.pinimg.com/564x/d2/ae/eb/d2aeebcd218d81c992ad42f9136e59cd.jpg",
    },
    {
        name: "Leo Messi 2",
        src: "https://i.pinimg.com/564x/63/73/16/637316c1b91b454fdbd8d724aa6eb0c8.jpg",
        profile: "https://i.pinimg.com/564x/d2/ae/eb/d2aeebcd218d81c992ad42f9136e59cd.jpg",
    },

]


function Stories() {
    return (
        <div className="flex justify-center space-x-3 mx-auto overflow-x-auto scrollbar-hide">
            {stories.map((story) => (
                <StoryCard key={story.name} name={story.name} src={story.src} profile={story.profile} />
            ))}
        </div>
    )
}

export default Stories
