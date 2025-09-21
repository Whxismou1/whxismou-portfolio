import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { Html, Head, Preview, Tailwind, Body, Container, Heading, Text, Hr } from "@react-email/components";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ContactEmail({ name, email, message }) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New contact form submission</Preview>
      <Tailwind>
        <Body className="bg-white font-sans p-4">
          <Container className="mx-auto p-4 border rounded-lg shadow-sm bg-gray-50">
            <Heading className="text-xl font-bold mb-4">📬 New Message from Portfolio</Heading>
            <Text><strong>Name:</strong> {name}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            <Text><strong>Message:</strong></Text>
            <Text className="mt-2 p-2 bg-white border rounded">{message}</Text>
            <Hr className="my-4" />
            <Text className="text-gray-600 text-sm">
              ⚡ Sent from your portfolio contact form. Reply directly to <strong>{email}</strong>.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

