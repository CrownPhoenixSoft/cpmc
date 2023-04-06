import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, showToast } from "ui"
import { Button } from "ui/button"
import { Form, TextAreaField, TextField } from "ui/form"
import { z } from "zod"

const validationSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    subject: z.string().min(1),
    message: z.string().min(1),
})

type FormValues = z.infer<typeof validationSchema>

type Props = {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export default function ContactDialog({ isOpen, onOpenChange }: Props) {
    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
        resolver: zodResolver(validationSchema),
    })
    const { register } = form
    const { isSubmitting } = form.formState

    const handleSubmit = async (data: FormValues) => {
        await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        showToast("Thank you for contacting us! We will get back to you as soon as possible.", "success")

        form.reset()
        onOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white">
                <DialogHeader title="Contact us" />
                <Form form={form} handleSubmit={handleSubmit}>
                    <TextField {...register("name")} label="Full Name" />
                    <TextField {...register("email")} label="Email Address" />
                    <TextField {...register("phone")} label="Phone number" />
                    <TextField {...register("subject")} label="Subject" />
                    <TextAreaField {...register("message")} label="Message" rows={4} />
                    <DialogFooter>
                        <DialogClose color="secondary">Close</DialogClose>
                        <Button loading={isSubmitting} type="submit">
                            Submit
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
