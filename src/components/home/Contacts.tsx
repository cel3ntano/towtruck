import { ContactsClient } from "./ContactsClient";

interface ContactsProps {
  phoneNumbers: PhoneNumber[];
  title?: string;
  description?: string;
}

interface PhoneNumber {
  id: number;
  phone_number: string;
}

export function Contacts({
  phoneNumbers,
  title = "Контакти",
  description,
}: ContactsProps) {
  if (!phoneNumbers) {
    return null;
  }

  return (
    <section className='bg-background py-12'>
      <div className='container mx-auto px-4'>
        <ContactsClient
          phoneNumbers={phoneNumbers}
          title={title}
          description={description}
        />
      </div>
    </section>
  );
}
