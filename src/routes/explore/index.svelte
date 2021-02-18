<script>
	// Importing modules

	// Importing stores
	import cache from "../../stores/cache.js";

	// Importing components
	import {
		Icon,
		Browser
	} from "../../components";

	function chooseCategory(category) {
		if (category == "all") {
			currentType = "all";
			cache.setCache("browser.currentTypes", currentType);
		} else {
			currentType = category;
			cache.setCache("browser.currentTypes", currentType);
		};
	};

	let types = [
		{
			id: "all",
			types: ["artwork","text"],
			title: "Всё вместе",

			visual: {
				background: "pink-500",
				icon: "at-sign"
			}
		},	
		{
			id: "artwork",
			types: "artwork",
			title: "Рисунки",

			visual: {
				background: "yellow-400",
				icon: "image"
			}
		},
		{
			id: "text",
			types: "text",
			title: "Рассказы",

			visual: {
				background: "indigo-400",
				icon: "type"
			}
		}
	];

	let currentType = $cache["browser.currentTypes"] == null ? "all" : $cache["browser.currentTypes"];
</script>

<!-- Container -->
<div style="overflow: hidden; overflow-y: auto;" id="list" class="w-full h-full">
	<!-- Fast Actions -->
	<div style="overflow: hidden; overflow-x: auto;" class="h-16 w-full relative mt-4 mb-6">
		<div class="absolute inset-0 h-full px-4 md:px-6 flex items-stretch">
			<!-- Create new Post -->
			<div class="mx-4 md:mx-2 w-auto md:w-1/6 px-4 flex items-center rounded-md bg-light-dark p-2">
				<!-- Icon -->
				<div class="w-10 md:w-1/6">
					<div style="padding-top: 100%" class="w-full relative">
						<div class="absolute inset-0 w-full h-full rounded-md flex justify-center items-center bg-green-500">
							<Icon name="feather" attrs={{ class: "text-white w-2/3" }} />
						</div>
					</div>
				</div>

				<!-- Text -->
				<div class="pl-3 w-5/6">
					<h1 class="text-sm text-white font-medium">Написать пост</h1>
				</div>
			</div>

			<!-- Divider -->
			<div style="width: 2px;" class="hidden md:block mx-2 h-12 rounded-md bg-light-dark opacity-50"></div>

			<!-- Some other filters -->
			{ #each types as type }
				<div on:click={() => chooseCategory(type.id)} class="cursor-pointer mx-2 w-max md:w-1/6 px-4 flex items-center rounded-md { typeof currentType == "object" ? currentType.includes(type.id) ? `bg-${type.visual.background}` : "bg-light-dark" : currentType == type.id ? `bg-${type.visual.background}` : "bg-light-dark" } p-2">
					<!-- Icon -->
					<div class="w-10 md:w-1/6">
						<div style="padding-top: 100%" class="w-full relative">
							<div class="absolute inset-0 w-full h-full rounded-md flex items-center justify-center { typeof currentType == "object" ? currentType.includes(type.id) ? "bg-white" : `bg-${type.visual.background}` : currentType == type.id ? "bg-white" : `bg-${type.visual.background}` }">
								<Icon name="{type.visual.icon}" attrs={{ class: `w-2/3 ${ typeof currentType == "object" ? currentType.includes(type.id) ? `text-${type.visual.background}` : "text-white" : currentType == type.id ? `text-${type.visual.background}` : "text-white" }` }} />
							</div>
						</div>
					</div>

					<!-- Text -->
					<div class="pl-3 w-5/6">
						<h1 class="text-sm text-white font-medium">{type.title}</h1>
						
						{ #if typeof currentType == "object" ? currentType.includes(type.id) : currentType == type.id }
							<p class="text-xs text-white opacity-75">Выбранно</p>
						{ /if }
					</div>
				</div>
			{ /each }

			<!-- Other -->
			<div class="mx-2 w-max md:w-1/6 px-4 flex items-center rounded-md bg-light-dark p-2">
				<!-- Icon -->
				<div class="w-10 md:w-1/6">
					<div style="padding-top: 100%" class="w-full relative">
						<div class="absolute inset-0 w-full h-full bg-dark rounded-md flex justify-center items-center">
							<!-- Icon itself -->
							<Icon name="more-horizontal" attrs={{ class: "text-white w-2/3" }} />
						</div>
					</div>
				</div>

				<!-- Text -->
				<div class="pl-3 w-5/6">
					<h1 class="text-sm text-white font-medium">Другие фильтры</h1>
				</div>
			</div>
		</div>
	</div>

	<Browser types={
		types.filter((x) => {
			if (typeof currentType == "object") {
				return currentType.includes(x.id);
			} else {
				return currentType == x.id;
			};
		}).map((x) => x.types)
	} />
</div>