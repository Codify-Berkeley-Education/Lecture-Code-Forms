import { useForm, SubmitHandler} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    // Fields are required by default in zod
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string()
        .min(1, "Password is required")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/\d/, "Password must contain at least 1 digit"),
    confirmPassword: z.string()
        .min(1, "Confirm Password is required"),
    haveDog: z.boolean(),
    date: z.coerce.date().refine((date) => { {/* coerce converted to type placed after -parse string as .date() refine used for custom logic not covered in zod*/}
        const today = new Date().toISOString() //YYYY-MM-DDTHH:mm:ss.sssZ, works cause string comparison
        return date.toISOString() <= today
    },"Date cannot be in the Future"), // date is going to be string but we want to parse w/ coerce.date()
    year: z.enum(["freshman", "sophomore", "other"]).optional(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"] // used to pick which input applied to
})

type Inputs = z.infer<typeof schema>;

export function Form() {
    const { register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2> Survey</h2>
            <div>
                <label htmlFor="email">Email: </label> {/* htmlFor and id primarily screen readers and readability*/}
                <input type="text" id="email" {...register("email")}/>
            </div>
            {errors.email && <p>{errors.email.message}</p>} {/*Conditional rendering*/}
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" {...register("password")}/>
            </div>
            {errors.password && <p>{errors.password.message}</p>}
            <div>
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="password" id="confirmPassword" {...register("confirmPassword")}/>
            </div>
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            <div>
                <label htmlFor="haveDog">Do you have a dog?</label>
                <input type="checkbox" id="haveDog" {...register("haveDog")}/>
            </div>
            <div>
                <label htmlFor="date">Current Date:</label>
                <input type="date" id="date" {...register("date")}/>
            </div>
            {errors.date && <p>{errors.date.message}</p>}
            <div>
                <label>School Year: </label>
                <select {...register("year")}>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}