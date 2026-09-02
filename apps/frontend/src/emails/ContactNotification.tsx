import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface ContactNotificationProps {
  name: string
  email: string
  phone: string
  message: string
}

export const ContactNotificationEmail = ({
  name,
  email,
  phone,
  message,
}: ContactNotificationProps) => (
  <Html>
    <Head />
    <Preview>Có khách hàng mới liên hệ từ Website - {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thông báo khách hàng liên hệ</Heading>
        <Text style={text}>
          Xin chào Admin, có một khách hàng vừa điền form liên hệ trên website với thông tin sau:
        </Text>
        <Section style={informationTable}>
          <Text style={infoRow}>
            <strong>Họ và tên:</strong> {name}
          </Text>
          <Text style={infoRow}>
            <strong>Số điện thoại:</strong> {phone}
          </Text>
          <Text style={infoRow}>
            <strong>Email:</strong> {email}
          </Text>
          <Hr style={hr} />
          <Text style={infoRow}>
            <strong>Nội dung lời nhắn:</strong>
          </Text>
          <Text style={messageText}>{message}</Text>
        </Section>
        <Text style={footer}>
          Đây là email tự động từ hệ thống Website. Vui lòng đăng nhập vào trang quản trị CRM để xem chi tiết và phản hồi khách hàng.
        </Text>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0 24px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 24px',
}

const informationTable = {
  padding: '24px',
  backgroundColor: '#f9fafb',
  borderRadius: '4px',
  margin: '24px',
}

const infoRow = {
  color: '#333',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '4px 0',
}

const messageText = {
  color: '#333',
  fontSize: '15px',
  lineHeight: '24px',
  padding: '12px',
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '4px',
  marginTop: '8px',
  whiteSpace: 'pre-wrap' as const,
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '16px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 24px',
}

export default ContactNotificationEmail
