import React from 'react'
import Sidebar from '../../components/SideBars/index'
import TopBar from '../../components/TopBar/index'
import Feed from '../../components/Feed/Feed2'
import Widgets from '../../components/Widgets/index'


export default function Home() {
    return (
        <div className="h-screen dark:bg-gray-800 overflow-hidden">
            <TopBar />
            <main className="flex">
                <Sidebar />
                <Feed />
                <Widgets />
            </main>
        </div>
    )
}
