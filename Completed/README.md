# Lecture Code Setup

Go to the blank folder and run the following
commands:
```bash
  bun install
 ```

```bash 
  bun install react-hook-form
```

```bash
  bun install zod
```

```bash
 bun install @hookform/resolvers
```

To Run the code:
```bash
  bun run dev
```
then go to http://localhost:5173/ in your browser

Topics to cover:
- Input types and labels & htmlFor/ids InputTypes.tsx, value on select options
- type Inputs, useForm, onSubmit, ...register, console.log
- Validation, formstate: {errors}, required: keyword to register {required:""}, cond render
- Validation w Zod, define schema simple .string() etc, types are infer from schema, useForm resolver react form using zod
- Required fields, custom validation, refine,