import Image from "next/image";

export default function Brands({ title, children, images }) {
	return (
		<section className="mb-12 flex w-full flex-col items-center justify-center px-4 pt-12 last:mb-0">
			<h2 className="mb-2 text-xs font-bold uppercase text-black dark:text-white">
				{title}
			</h2>
			<div className="mx-auto flex w-full max-w-7xl flex-wrap justify-around">
				{images &&
					images.map((img, i) => (
						<a
							key={i}
							href={img.url}
							target="_blank"
							rel="noreferrer"
							aria-label={`link to ${img.name}`}
							className="h-fit w-1/2 p-2 sm:w-1/3 lg:w-1/5">
							{img.svg ? (
								<img.c
									alt={`${img.name} logo`}
									className="h-20 w-full rounded-xl object-contain p-4 dark:bg-slate-200"
								/>
							) : (
								<Image
									src={img.c}
									alt={`${img.name} logo`}
									className="h-20 w-full rounded-xl object-contain p-4 dark:bg-slate-200"
								/>
							)}
						</a>
					))}
			</div>
			{children}
		</section>
	);
}
