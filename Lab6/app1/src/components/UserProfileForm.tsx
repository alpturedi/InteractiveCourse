import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { z } from "zod";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  console.log(field.state.meta.errors);
  return (
    <div>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors?.[0]?.message}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </div>
  );
}

const userSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function UserProfileForm() {
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
    validators: {
      onChange: userSchema,
    },
  });

  return (
    <form
      className="grid grid-cols-3 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="fullName"
        children={(field) => {
          // Avoid hasty abstractions. Render props are great!
          return (
            <div>
              <label htmlFor={field.name}>Full Name:</label>
              <input
                className="border border-gray-300 rounded-md p-1"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />
      <form.Field
        name="email"
        validators={{
          onChange: (value) => {
            console.log(value);
          },
        }}
        children={(field) => {
          return (
            <div>
              <label htmlFor={field.name}>Email:</label>
              <input
                className="border border-gray-300 rounded-md p-1"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />
      <form.Field
        name="password"
        children={(field) => {
          return (
            <div>
              <label htmlFor={field.name}>Password:</label>
              <input
                type="password"
                className="border border-gray-300 rounded-md p-1"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
