<script>
	// Importing modules
	import { onMount } from "svelte";
	import axios from "axios";

	// Importing components
	import { ArtworkCard } from "../../components";

	// Test Data
	let testData = [];

	// Populating our test data
	onMount(() => {
		axios.get(`https://furrynetwork.com/api/search/artwork/popular?size=38&&time=lastWeek&from=0`)
		.then((response) => {
			let data = response.data.hits;

			testData = data.map((x) => {
				let obj = {
					id: x._id,
					type: "artwork",

					provider: "furrynetwork",

					source: {
						title: x._source.title,
						description: x._source.description,

						image: `https://d3gz42uwgl1r1y.cloudfront.net/${x._source.url}`,
						published: x._source.published,

						views: x._source.views,
						nsfw: x._source.tags.includes("yiff")
					},

					author: {
						id: x._source.character.id,
						nickname: x._source.character.name,
						displayName: x._source.character.display_name,
						avatar: `https://d3gz42uwgl1r1y.cloudfront.net/${x._source.character.avatar}`
					}
				};

				return obj;
			});
		});
	});
</script>

<!-- Discover -->
<h2 class="text-3xl text-white font-bold mt-8 mb-6 px-8">Новости</h2>

<div class="w-full flex px-8">
	<div class="w-2/3 px-1">
		<div style="padding-top: 50%;" class="w-full relative">
			<div class="absolute inset-0 w-full h-full rounded-lg bg-indigo-400 flex p-8">
				<!-- Text -->
				<div class="w-2/3">
					<!-- Badge -->
					<div class="rounded-full bg-black opacity-50 text-white text-xs px-3 py-1 w-min">
						Статья
					</div>

					<h1 class="text-4xl my-4 text-white font-bold">How to do Basic Jumping and how to landing safely</h1>
					
					<!-- Author -->
					<div class="w-full flex items-center opacity-70">
						<!-- Avatar -->
						<div style="" class="bg-red-500 w-11 h-11 rounded-full relative">

						</div>

						<!-- Text -->
						<div class="ml-2">
							<!-- Username -->
							<h2 class="text-md text-white font-medium">Marsh Jameson</h2>

							<!-- Post info -->
							<div class="flex items-center mt-1">
								<!-- Post Views -->
								<p class="text-white text-xs">54k просмотров</p>

								<!-- Dot -->
								<div class="w-1 h-1 mx-2 bg-white rounded-full"></div>
								
								<!-- Post Time -->
								<p class="text-white text-xs">2 недели назад</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Reading Time Badge -->
				<div class="absolute bottom-0 right-0 p-3">
					<div class="rounded-full bg-black opacity-50 text-white text-xs px-3 py-1">
						7 минут
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="w-1/3 px-1">
		<div style="padding-top: 101%;" class="w-full relative">
			<div class="absolute inset-0 w-full h-full rounded-lg bg-yellow-400 p-8">
				<!-- Text -->
				<div class="w-4/5">
					<!-- Badge -->
					<div class="rounded-full bg-black opacity-50 text-white text-xs px-3 py-1 w-min">
						Статья
					</div>

					<h1 class="text-3xl my-4 text-white font-bold">Skateboard tips You need to know</h1>
					
					<!-- Author -->
					<div class="w-full opacity-70">
						<!-- Text -->
						<div>
							<!-- Username -->
							<h2 class="text-md text-white font-medium">Marsh Jameson</h2>

							<!-- Post info -->
							<div class="flex items-center mt-1">
								<!-- Post Views -->
								<p class="text-white text-xs">54k просмотров</p>

								<!-- Dot -->
								<div class="w-1 h-1 mx-2 bg-white rounded-full"></div>
								
								<!-- Post Time -->
								<p class="text-white text-xs">2 недели назад</p>
							</div>
						</div>
						
						<!-- Avatar -->
						<div style="" class="mt-2 bg-red-500 w-11 h-11 rounded-full relative">

						</div>
					</div>
				</div>

				<!-- Reading Time Badge -->
				<div class="absolute bottom-0 right-0 p-3">
					<div class="rounded-full bg-black opacity-50 text-white text-xs px-3 py-1">
						7 минут
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Provider: furrynetwork -->
<div class="flex items-center mt-8 mb-6 px-8">
	<h2 class="text-3xl text-white font-bold">Исследовать</h2>

	<!-- FurryNetwork badge -->
	<div class="px-4 py-2 flex items-center justify-center bg-light-dark ml-2 rounded-md">
		<h1 class="text-md text-white font-bold uppercase">furry</h1>
		<h1 class="text-md text-indigo-400 font-medium uppercase">network</h1>
	</div>
</div>

<div class="w-full flex flex-wrap items-center px-6">
	{ #each testData as entry }
		<ArtworkCard size="md" entry={entry} />
	{ /each }

	<!-- More Button -->
	<div class="w-1/3 relative p-2">
		<div style="padding-top: 120%" class="w-full relative">
			<div style="background: url('https://media.giphy.com/media/3ndAvMC5LFPNMCzq7m/giphy.gif'); background-position: center; background-size: cover;" class="absolute inset-0 w-full h-full bg-light-dark rounded-lg flex justify-center items-center">
				<div style="z-index: 1;" class="absolute inset-0 w-full h-full bg-dark opacity-30 rounded-t-md"></div>
				
				<!-- FurryNetwork badge -->
				<div class="absolute top-0 left-0 p-2">
					<div class="px-2 py-1 flex items-center justify-center bg-light-dark rounded-md">
						<h1 class="text-sm text-white font-bold uppercase">furry</h1>
						<h1 class="text-sm text-indigo-400 font-medium uppercase">network</h1>
					</div>
				</div>

				<!-- Text -->
				<div style="z-index: 2;" class="px-6">
					<h2 class="text-2xl text-white font-bold mb-2">Больше подобного контента</h2> 
					<p class="text-md text-gray-100 opacity-95">Больше подобного контент вы сможете найти на сайте наших <strike>конкурентов</strike> знакомых</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Popular -->
<h2 class="text-3xl text-white font-bold mt-8 mb-6 px-8">Самое популярное</h2>

<div class="w-full flex flex-wrap items-center px-6">
	<!-- Entry (type: image) -->
	<div class="w-1/4 relative p-2">
		<div style="padding-top: 120%" class="w-full relative">
			<div class="absolute inset-0 w-full h-full bg-light-dark rounded-lg flex flex-col">
				<!-- Image itself -->
				<div style="background: url('https://static1.e621.net/data/f4/37/f4376c084a7b1db1104153b262c1b47c.jpg'); background-position: center; background-size: cover;" class="rounded-t-md h-2/3 w-full relative">
					<div class="absolute inset-0 w-full h-full bg-dark opacity-30 rounded-t-md"></div>
				</div>

				<!-- Avatar + Badge -->
				<div class="absolute top-0 right-0 p-2 opacity-80">
					<!-- Avatar -->
					<div class="w-8 h-8 bg-red-500 rounded-full"></div>
				</div>

				<!-- Text -->
				<div class="h-1/3 w-full p-2">
					<!-- Image Name -->
					<h2 class="text-md text-white font-bold my-2">Family-friendly dalmatian preparing for his...</h2>

					<!-- Statistics -->
					<div class="flex items-center opacity-50">
						<!-- Post Views -->
						<p class="text-white text-xs">54k просмотров</p>

						<!-- Dot -->
						<div class="w-1 h-1 mx-2 bg-white rounded-full"></div>
						
						<!-- Post Time -->
						<p class="text-white text-xs">2 недели назад</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Entry (type: nsfw image) -->
	<div class="w-1/4 relative p-2">
		<div style="padding-top: 120%" class="w-full relative">
			<div class="absolute inset-0 w-full h-full bg-light-dark rounded-lg flex flex-col">
				<!-- Image itself -->
				<div style="z-index: 0; overflow: hidden;" class="rounded-t-md h-2/3 w-full relative">
					<!-- Image -->
					<div style="z-index: 1; filter: blur(5px); background: url('https://static1.e621.net/data/sample/ee/88/ee884aa4fc23475c641a27ec8d6072d9.jpg'); background-position: center; background-size: cover;" class="absolute inset-0"></div>

					<div style="z-index: 2;" class="absolute inset-0 w-full h-full bg-dark opacity-95 rounded-t-md flex justify-center items-center">
						<!-- Badge -->
						<div class="px-3 py-1 bg-light-dark rounded-full text-white text-sm">
							NSFW
						</div>
					</div>
				</div>

				<!-- Avatar + Badge -->
				<div class="absolute top-0 right-0 p-2 opacity-80">
					<!-- Avatar -->
					<div class="w-8 h-8 bg-red-500 rounded-full"></div>
				</div>

				<!-- Text -->
				<div class="h-1/3 w-full p-2">
					<!-- Image Name -->
					<h2 class="text-md text-white font-bold my-2">Not Family-friendly dalmatian sucking big...</h2>

					<!-- Statistics -->
					<div class="flex items-center opacity-50">
						<!-- Post Views -->
						<p class="text-white text-xs">54k просмотров</p>

						<!-- Dot -->
						<div class="w-1 h-1 mx-2 bg-white rounded-full"></div>
						
						<!-- Post Time -->
						<p class="text-white text-xs">2 недели назад</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Entry (type: text) -->
	<div class="w-1/4 relative p-2">
		<div style="padding-top: 120%" class="w-full relative">
			<div style="overflow: hidden; overflow-y: auto;" class="absolute inset-0 w-full h-full bg-light-dark rounded-lg">
				<!-- Text Title -->
				<div style="z-index: 2;" class="p-3">
					<!-- Image Name -->
					<h2 class="text-md text-white font-bold my-2">История одного далматина...</h2>

					<!-- Statistics -->
					<div class="flex items-center opacity-50">
						<!-- Post Views -->
						<p class="text-white text-xs">54k просмотров</p>

						<!-- Dot -->
						<div class="w-1 h-1 mx-2 bg-white rounded-full"></div>
						
						<!-- Post Time -->
						<p class="text-white text-xs">2 недели назад</p>
					</div>
				</div>

				<!-- Author icon -->
				<div class="absolute top-0 right-0 opacity-80 p-2">
					<div class="w-8 h-8 bg-red-500 rounded-full"></div>
				</div>

				<!-- Description -->
				<div class="w-full h-auto px-3 relative">
					<p class="text-white text-sm opacity-80">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum praesentium et doloribus quisquam harum, dignissimos eaque quo repudiandae dolores autem error, ad iste, dolorem sint. Quisquam molestiae vel dolor nisi explicabo officia aperiam necessitatibus itaque sequi rem, praesentium ducimus at aliquam accusamus perspiciatis illo, iure adipisci ea numquam! Reprehenderit, velit natus optio quos sapiente praesentium quam adipisci explicabo autem illo quas aspernatur tenetur alias commodi eveniet qui nesciunt maiores maxime laborum. Ipsam quo, corrupti sequi vel itaque illo obcaecati sint cumque consequatur quod dolores sapiente animi vero eligendi porro iusto repudiandae, quae vitae non repellat quam, quibusdam voluptatibus. Quas, quibusdam molestiae! Rem sapiente eius quis repudiandae commodi nesciunt nam corrupti odit, aut blanditiis in inventore, cumque ab facere. Aliquid aliquam tempore exercitationem assumenda debitis et nulla dolor odio reiciendis repellendus labore tenetur, natus ut itaque explicabo expedita dolores modi illum. Provident minus optio delectus culpa assumenda eaque ipsam nihil eos?</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Entry (type: text with image) -->
	<div class="w-1/4 relative p-2">
		<div style="padding-top: 120%" class="w-full relative">
			<div style="overflow: hidden; overflow-y: auto;" class="absolute inset-0 w-full h-full bg-light-dark rounded-lg">
				<!-- Image -->
				<div style="background: url('https://i.pinimg.com/originals/e1/61/d5/e161d573eb8616af64bbba0108f58d06.png'); background-size: cover; background-position: center;" class="h-1/3 w-full rounded-t-md"></div>
				
				<!-- Text Title -->
				<div style="z-index: 2;" class="p-3">
					<!-- Image Name -->
					<h2 class="text-md text-white font-bold my-2">История одного далматина...</h2>

					<!-- Statistics -->
					<div class="flex items-center opacity-50">
						<!-- Post Views -->
						<p class="text-white text-xs">54k просмотров</p>

						<!-- Dot -->
						<div class="w-1 h-1 mx-2 bg-white rounded-full"></div>
						
						<!-- Post Time -->
						<p class="text-white text-xs">2 недели назад</p>
					</div>
				</div>

				<!-- Author icon -->
				<div class="absolute top-0 right-0 opacity-80 p-2">
					<div class="w-8 h-8 bg-red-500 rounded-full"></div>
				</div>

				<!-- Description -->
				<div class="w-full h-auto px-3 relative">
					<p class="text-white text-sm opacity-80">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum praesentium et doloribus quisquam harum, dignissimos eaque quo repudiandae dolores autem error, ad iste, dolorem sint. Quisquam molestiae vel dolor nisi explicabo officia aperiam necessitatibus itaque sequi rem, praesentium ducimus at aliquam accusamus perspiciatis illo, iure adipisci ea numquam! Reprehenderit, velit natus optio quos sapiente praesentium quam adipisci explicabo autem illo quas aspernatur tenetur alias commodi eveniet qui nesciunt maiores maxime laborum. Ipsam quo, corrupti sequi vel itaque illo obcaecati sint cumque consequatur quod dolores sapiente animi vero eligendi porro iusto repudiandae, quae vitae non repellat quam, quibusdam voluptatibus. Quas, quibusdam molestiae! Rem sapiente eius quis repudiandae commodi nesciunt nam corrupti odit, aut blanditiis in inventore, cumque ab facere. Aliquid aliquam tempore exercitationem assumenda debitis et nulla dolor odio reiciendis repellendus labore tenetur, natus ut itaque explicabo expedita dolores modi illum. Provident minus optio delectus culpa assumenda eaque ipsam nihil eos?</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Entry (type: podcast) -->
	<div class="w-1/4 relative p-2">
		<div style="padding-top: 120%" class="w-full relative">
			<div class="absolute inset-0 w-full h-full bg-light-dark rounded-lg">
				<!--  -->
			</div>
		</div>
	</div>
</div>