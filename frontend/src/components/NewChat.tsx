// import { ConfigList } from "./ConfigList";
import { Schemas } from '../hooks/useSchemas'
import TypingBox from './TypingBox'
// import { Config } from "./Config";
import { ConfigListProps } from '../hooks/useConfigList'
import { Button } from './ui/Button'
import { Tab } from '@headlessui/react'
import { IconArrowRight } from './ui/Icons'
import { useState } from 'react'

interface NewChatProps extends ConfigListProps {
	configSchema: Schemas['configSchema']
	configDefaults: Schemas['configDefaults']
	startChat: (message: string) => Promise<void>
}

const exampleMessages = [
	{
		heading:
			'Can you provide me with articles related to nanotechnology within the field of biomedical sciences?',
		message: `Can you provide me with articles related to nanotechnology within the field of biomedical sciences?`
	},
	{
		heading: 'What is the latest patent registered by Apple Inc?',
		message: 'What is the latest patent registered by Apple Inc?'
	},
	{
		heading:
			'Can you inform me on ethical considerations in social science research, particularly in dealing with human subjects?',
		message: `Can you inform me on ethical considerations in social science research, particularly in dealing with human subjects?`
	}
]

export function NewChat(props: NewChatProps) {
	let [categories] = useState(['✨GPT-4', '⚡GPT-3.5', '🤖 LLaMA v2 13B'])
	const [currentModel, setCurrentModel] = useState('GPT 3.5 Turbo')

	function setInput(message: string) {
		props.startChat(message)
	}

	function changeCurrentModel(model: string) {
		if (props.currentConfig?.config.configurable?.agent_type) {
			props.currentConfig.config.configurable.agent_type = model
			setCurrentModel(model)
		}
	}
	const selectedTab = () => {
		if (props.currentConfig?.config.configurable?.agent_type === 'GPT 4') {
			return '✨GPT-4'
		} else if (
			props.currentConfig?.config.configurable?.agent_type === 'GPT 3.5 Turbo'
		) {
			return '⚡GPT-3.5'
		} else if (
			props.currentConfig?.config.configurable?.agent_type === 'Llama 2-13B'
		) {
			return '🤖 LLaMA v2 13B'
		}

		return '✨GPT-4'
	}

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(' ')
	}

	function getTextForSelectedModel(tab: string) {
		let model = 'GPT 3.5 Turbo'
		if (tab === '✨GPT-4') {
			model = 'GPT 4'
		} else if (tab === '⚡GPT-3.5') {
			model = 'GPT 3.5 Turbo'
		} else if (tab === '🤖 LLaMA v2 13B') {
			model = 'Llama 2-13B'
		}

		switch (model) {
			case 'GPT 4':
				return 'GPT-4 is the latest and most powerful model from OpenAI. It is the most resource-intensive model and is the most accurate. '
			case 'GPT 3.5 Turbo':
				return 'GPT-3.5 Turbo is a more resource-efficient version of GPT-4. It is less accurate than GPT-4 but more accurate than Llama 2-13B.'
			case 'Llama 2-13B':
				return 'Llama 2-13B is the most resource-efficient model. It is less accurate than GPT-4 and GPT-3.5 Turbo.'
			default:
				return ''
		}
	}

	const modelTexts: any = {
		'GPT 4':
			'GPT-4 is the latest and most powerful model from OpenAI. It is the most resource-intensive model and is the most accurate. ',
		'GPT 3.5 Turbo':
			'GPT-3.5 Turbo is a more resource-efficient version of GPT-4. It is less accurate than GPT-4 but more accurate than Llama 2-13B.',
		'Llama 2-13B':
			'Llama 2-13B is the most resource-efficient model. It is less accurate than GPT-4 and GPT-3.5 Turbo.',
		default: ''
	}

	return (
		<div className="flex flex-col items-stretch">
			<div className="mx-auto min-w-2xl px-4 mb-5">
				<div className="rounded-lg border bg-background p-8">
					<div className="flex flex-col gap-10 pt-12 sm:flex-row">
						<img
							className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
							src={
								'https://firebasestorage.googleapis.com/v0/b/gpt3-app.appspot.com/o/WhatsApp%20Image%202023-11-12%20at%2000.33.27.jpeg?alt=media&token=d4e41398-950a-482b-9213-6ba5859a131e'
							}
							alt="Dexter"
						/>
						<div className="max-w-xl flex-auto">
							<h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
								Hi! I'm Dexter
							</h3>
							<p className="text-base leading-7 text-gray-600">
								Your AI research Assistant
							</p>
							<p className="mt-6 text-base leading-7 text-gray-600">
								{`I cover all research needs such as academic papers, real-time Google searches, citations, data analysis, market research.`}
							</p>

							<p className="mt-6 text-base leading-7 text-gray-600">
								{`And the best part? I only improve with time, adapting to newer models, reducing resources, and offering utmost accuracy.`}
							</p>
						</div>
					</div>

					<div className="w-full mx-auto max-w-md px-2 py-6 sm:px-0">
						<h3 className="text-center mb-3 font-semibold leading-6">
							Select Model
						</h3>

						<Tab.Group>
							<Tab.List className="flex space-x-1 rounded-xl bg-orange-900/20 p-1">
								{categories.map((category) => (
									<Tab
										onClick={() => {
											if (category === '✨GPT-4') {
												changeCurrentModel('GPT 4')
												getTextForSelectedModel(selectedTab())
											} else if (category === '⚡GPT-3.5') {
												changeCurrentModel('GPT 3.5 Turbo')
												getTextForSelectedModel(selectedTab())
											} else if (category === '🤖 LLaMA v2 13B') {
												changeCurrentModel('Llama 2-13B')
												getTextForSelectedModel(selectedTab())
											}
										}}
										key={category}
										className={() =>
											classNames(
												'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
												'ring-white ring-opacity-60 ring-offset-2 ring-offset-orange-400 focus:outline-none focus:ring-2',
												selectedTab() === category
													? 'bg-orange-500 shadow'
													: 'dark:text-white text-black hover:bg-orange-100/[0.12] hover:text-white'
											)
										}
									>
										{category}
									</Tab>
								))}
							</Tab.List>
						</Tab.Group>
					</div>
					<p className="leading-normal text-muted-foreground font-bold mb-3">
						{modelTexts[currentModel] ?? modelTexts.default}
					</p>
					<p className="leading-normal text-muted-foreground">
						You can start a conversation here or try the following examples:
					</p>
					<div className="mt-4 flex flex-col items-start space-y-2">
						{exampleMessages.map((message, index) => (
							<Button
								key={index}
								variant="link"
								className="h-auto p-0 text-base"
								onClick={() => setInput(message.message)}
							>
								<IconArrowRight className="mr-2 text-muted-foreground" />
								{message.heading}
							</Button>
						))}
					</div>
				</div>
				<div className="fixed left-0 lg:left-72 bottom-0 right-0 p-4">
					<TypingBox
						onSubmit={props.startChat}
						disabled={!props.currentConfig}
					/>
				</div>
			</div>
		</div>
	)
}
