import * as React from "react"

type Props = {
    title: string,
    description: string,
}

const FeatureCard = (props: Props) => {
    return (
        <div className="relative w-[300px] h-72 rounded-xl overflow-hidden border border-black hover:border-secondary hover:scale-[1.02] transition-all duration-300">
            <div className="w-full h-full bg-white/20">
                <div className="w-full h-full bg-white opacity-70 blur-sm">
                    <img src="/Feature Card.avif" className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full h-full py-10 px-4">
                    <div className="mb-5">
                        <h1 className="font-serif font-bold tracking-wider text-2xl text-secondary">{props.title}</h1>
                    </div>
                    <div>
                        <p className="font-mono tracking-tighter font-light text-sm">{props.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureCard