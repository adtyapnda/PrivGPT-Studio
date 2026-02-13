"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

/**
 * FormField component that provides context for form field components.
 *
 * This component wraps react-hook-form's Controller and provides context
 * for child form components like FormLabel, FormControl, etc. It handles
 * the connection between the form state and individual field components.
 *
 * @template TFieldValues - The type of the form values.
 * @template TName - The type of the field name.
 * @param {ControllerProps<TFieldValues, TName>} props - The controller props from react-hook-form.
 * @returns {JSX.Element} The form field context provider.
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

/**
 * FormItem component that wraps form field elements.
 *
 * Provides a container for form field components with proper spacing and
 * generates unique IDs for accessibility. Should contain FormLabel,
 * FormControl, FormDescription, and FormMessage components.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div element props.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} The form item container.
 */
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

/**
 * FormLabel component for form field labels.
 *
 * Renders a label element connected to the form field control.
 * Automatically applies error styling when the field has validation errors.
 *
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props - Label primitive props.
 * @returns {JSX.Element} The form label element.
 */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

/**
 * FormControl component for form field input elements.
 *
 * Wraps input elements and provides proper ARIA attributes for accessibility,
 * including error states and descriptions. Uses Radix UI's Slot for composition.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Slot>} props - Slot component props.
 * @returns {JSX.Element} The form control wrapper.
 */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

/**
 * FormDescription component for field descriptions.
 *
 * Provides additional information about a form field. Typically used for
 * help text or instructions. Only visible when there are no validation errors.
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - Standard paragraph element props.
 * @returns {JSX.Element} The form description element.
 */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

/**
 * FormMessage component for displaying validation errors.
 *
 * Shows validation error messages for the form field. Only renders when
 * there is an error. Uses the error message from react-hook-form's field state.
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - Standard paragraph element props.
 * @param {React.ReactNode} [props.children] - Custom error message content.
 * @returns {JSX.Element | null} The error message element or null if no error.
 */
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
