<script>
	// Importing modules

	// Importing components
	import {
		Icon,
		Browser
	} from "../../components";
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

			<!-- All -->
			<div class="mx-2 w-max md:w-1/6 px-4 flex items-center rounded-md bg-light-dark p-2">
				<!-- Icon -->
				<div class="w-10 md:w-1/6">
					<div style="padding-top: 100%" class="w-full relative">
						<div class="absolute inset-0 w-full h-full rounded-md flex items-center justify-center bg-pink-500">
							<Icon name="at-sign" attrs={{ class: "w-2/3 text-white" }} />
						</div>
					</div>
				</div>

				<!-- Text -->
				<div class="pl-3 w-5/6">
					<h1 class="text-sm text-white font-medium">Всё вместе</h1>
				</div>
			</div>

			<!-- Image -->
			<div class="mx-2 w-max md:w-1/6 px-4 flex items-center rounded-md bg-yellow-400 p-2">
				<!-- Icon -->
				<div class="w-10 md:w-1/6">
					<div style="padding-top: 100%" class="w-full relative">
						<div class="absolute inset-0 w-full h-full bg-white rounded-md flex justify-center items-center">
							<!-- Icon itself -->
							<Icon name="image" attrs={{ class: "text-yellow-400 w-2/3" }} />
						</div>
					</div>
				</div>

				<!-- Text -->
				<div class="pl-3 w-5/6">
					<h1 class="text-sm text-white font-medium">Рисунки</h1>
					<p class="text-xs text-white opacity-75">Выбранно</p>
				</div>
			</div>

			<!-- Text -->
			<div class="mx-2 w-max md:w-1/6 px-4 flex items-center rounded-md bg-light-dark p-2">
				<!-- Icon -->
				<div class="w-10 md:w-1/6">
					<div style="padding-top: 100%" class="w-full relative">
						<div class="absolute inset-0 w-full h-full bg-indigo-400 rounded-md flex justify-center items-center">
							<!-- Icon itself -->
							<Icon name="type" attrs={{ class: "text-white w-2/3" }} />
						</div>
					</div>
				</div>

				<!-- Text -->
				<div class="pl-3 w-5/6">
					<h1 class="text-sm text-white font-medium">Рассказы</h1>
				</div>
			</div>

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

	<Browser />
</div>