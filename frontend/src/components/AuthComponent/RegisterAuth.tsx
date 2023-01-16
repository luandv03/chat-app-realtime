import { useState } from "react";
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
    LoadingOverlay,
} from "@mantine/core";
import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX, IconLock, IconAt } from "@tabler/icons";
import { authService } from "../../services/auth.service";

export function RegisterAuth() {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstname: "",
            lastname: "",
        },

        validateInputOnBlur: true,

        validate: {
            email: isEmail("Invalid email"),
            password: hasLength(
                { min: 8, max: 20 },
                "Value must have 8 or more characters"
            ),
            confirmPassword: (value, values) =>
                value !== values.password ? "Passwords did not match" : null,
            firstname: isNotEmpty("Invalid firstname"),
            lastname: isNotEmpty("Invalid lastname"),
        },
    });

    const handleError = (errors: typeof form.errors): void => {
        if (errors.name) {
            showNotification({
                message: "Please fill name field",
                color: "red",
            });
        } else if (errors.email) {
            showNotification({
                message: "Please provide a valid email",
                color: "red",
            });
            setLoading(false);
        }
    };

    const handleSubmit = (values: typeof form.values): void => {
        handleValidate(values);
    };

    const handleValidate = async (values: typeof form.values) => {
        try {
            const formData = new FormData();
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("confirmPassword", values.confirmPassword);
            formData.append("firstname", values.firstname);
            formData.append("lastname", values.lastname);
            avatar && formData.append("avatar", avatar);

            setLoading(true);
            await authService.register(formData);
            setLoading(false);

            showNotification({
                message: "You registered successfully!",
                color: "blue",
                icon: <IconCheck />,
                autoClose: 3000,
            });
            form.reset();
        } catch (error: any) {
            showNotification({
                title: "Register failure!",
                message: error.response.data.message,
                color: "red",
                icon: <IconX />,
                autoClose: 3000,
            });
        }
    };

    const handleAvatar = (file: File | null) => {
        setAvatar(file);
    };

    return (
        <>
            <LoadingOverlay
                visible={loading}
                overlayBlur={0.1}
                transitionDuration={200}
            />
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
                    <Anchor<"a"> href="/auth/login" size="sm">
                        Login account
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
                        <TextInput
                            label="Email"
                            placeholder="you@gmail.com"
                            icon={<IconAt size={16} />}
                            required
                            {...form.getInputProps("email")}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            icon={<IconLock size={16} />}
                            required
                            mt="md"
                            {...form.getInputProps("password")}
                        />
                        <PasswordInput
                            label="Confirm password"
                            placeholder="Your password"
                            icon={<IconLock size={16} />}
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
                        <FileInput
                            placeholder="Pick file"
                            label="Your avatar"
                            value={avatar}
                            onChange={handleAvatar}
                        />
                        <Button fullWidth mt="xl" type="submit">
                            Register
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
}
