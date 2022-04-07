export type ModalMessage = {
	header?: string
	paragraphs: string[]
	actions?: {label: string, action: () => void}[]
	closable?: boolean
}
