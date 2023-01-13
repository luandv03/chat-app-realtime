import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
    Group,
    FileInput,
} from "@mantine/core";
import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";

export function RegisterAuth() {
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstname: "",
            lastname: "",
        },

        validate: {
            email: isEmail("Invalid email"),
            password: hasLength(
                { min: 8 },
                "Value must have 8 or more characters"
            ),
            confirmPassword: (value, values) =>
                value !== values.password ? "Passwords did not match" : null,
            firstname: isNotEmpty("Invalid firstname"),
            lastname: isNotEmpty("Invalid lastname"),
        },
    });

    const handleValidate = () => {
        form.validate();
    };

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                })}
            >
                Welcome to IChat!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{" "}
                <Anchor<"a"> href="/login" size="sm">
                    Login account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="Email"
                    placeholder="you@gmail.com"
                    required
                    {...form.getInputProps("email")}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                    {...form.getInputProps("password")}
                />
                <PasswordInput
                    label="Confirm password"
                    placeholder="Your password"
                    required
                    mt="md"
                    {...form.getInputProps("confirmPassword")}
                />
                <Group position="apart" mt="lg" spacing="xs">
                    <TextInput
                        label="First Name"
                        required
                        size="xs"
                        {...form.getInputProps("firstname")}
                    />
                    <TextInput
                        label="Last Name"
                        required
                        size="xs"
                        {...form.getInputProps("lastname")}
                    />
                </Group>
                <FileInput placeholder="Pick file" label="Your avatar" />
                <Button fullWidth mt="xl" onClick={() => handleValidate()}>
                    Register
                </Button>
            </Paper>
        </Container>
    );
}
