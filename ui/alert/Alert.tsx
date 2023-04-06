import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid"
import clsx from "clsx"
import type { ReactNode } from "react"
import { FiInfo } from "react-icons/fi"

export interface AlertProps {
    title?: ReactNode
    // @TODO: Message should be children, more flexible?
    message?: ReactNode
    // @TODO: Provide action buttons so style is always the same.
    actions?: ReactNode
    className?: string
    iconClassName?: string
    // @TODO: Success and info shouldn't exist as per design?
    severity: "success" | "warning" | "error" | "info" | "neutral"
}

export function Alert(props: AlertProps) {
    const { severity, iconClassName } = props

    return (
        <div
            className={clsx(
                "rounded-md border border-opacity-20 p-3",
                props.className,
                severity === "error" && "border-red-900 bg-red-50 text-red-800",
                severity === "warning" && "border-yellow-700 bg-yellow-50 text-yellow-700",
                severity === "info" && "border-sky-700 bg-sky-50 text-sky-700",
                severity === "success" && "bg-inverted text-inverted",
                severity === "neutral" && "bg-subtle text-default border-none"
            )}>
            <div className="relative flex flex-col md:flex-row">
                <div className="flex-shrink-0">
                    {severity === "error" && (
                        <XCircleIcon
                            className={clsx("h-5 w-5 text-red-400", iconClassName)}
                            aria-hidden="true"
                        />
                    )}
                    {severity === "warning" && (
                        <ExclamationCircleIcon
                            className={clsx("h-5 w-5 text-yellow-400", iconClassName)}
                            aria-hidden="true"
                        />
                    )}
                    {severity === "info" && (
                        <InformationCircleIcon
                            className={clsx("h-5 w-5 text-sky-400", iconClassName)}
                            aria-hidden="true"
                        />
                    )}
                    {severity === "neutral" && (
                        <FiInfo className={clsx("text-default h-5 w-5", iconClassName)} aria-hidden="true" />
                    )}
                    {severity === "success" && (
                        <CheckCircleIcon
                            className={clsx("text-muted h-5 w-5", iconClassName)}
                            aria-hidden="true"
                        />
                    )}
                </div>
                <div className="ml-3 flex-grow">
                    <h3 className="text-sm font-medium">{props.title}</h3>
                    <div className="text-sm">{props.message}</div>
                </div>
                {/* @TODO: Shouldn't be absolute. This makes it harder to give margin etc. */}
                {props.actions && (
                    <div className="absolute right-1 top-1 text-sm md:relative">{props.actions}</div>
                )}
            </div>
        </div>
    )
}
