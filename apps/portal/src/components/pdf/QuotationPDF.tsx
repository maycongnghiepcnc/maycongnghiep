import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

// Register font for Vietnamese support
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 }
  ]
})

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#333'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 20
  },
  companyInfo: {
    flex: 1
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4
  },
  titleArea: {
    alignItems: 'flex-end',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textTransform: 'uppercase',
    marginBottom: 8
  },
  code: {
    fontSize: 12,
    color: '#666'
  },
  customerSection: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 4
  },
  customerLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 12
  },
  table: {
    width: '100%',
    marginBottom: 30
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: 8,
    fontWeight: 'bold'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    padding: 8
  },
  col1: { width: '40%' },
  col2: { width: '15%', textAlign: 'center' },
  col3: { width: '20%', textAlign: 'right' },
  col4: { width: '25%', textAlign: 'right' },
  
  totals: {
    width: '40%',
    alignSelf: 'flex-end',
    marginBottom: 40
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  totalLabel: {
    color: '#666'
  },
  totalValue: {
    fontWeight: 'bold'
  },
  finalTotal: {
    fontSize: 14,
    color: '#2563eb',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0'
  },
  notes: {
    marginBottom: 40,
    fontSize: 9,
    color: '#666'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0'
  },
  signature: {
    width: 200,
    alignItems: 'center'
  },
  signatureLine: {
    width: 150,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    marginTop: 40,
    marginBottom: 8
  }
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}

export default function QuotationPDF({ quotation }: { quotation: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>MÁY CÔNG NGHIỆP CNC</Text>
            <Text>123 Đường Công Nghiệp, KCN Tân Bình</Text>
            <Text>TP. Hồ Chí Minh, Việt Nam</Text>
            <Text>Hotline: 0987 654 321</Text>
            <Text>Email: contact@maycongnghiep.com</Text>
          </View>
          <View style={styles.titleArea}>
            <Text style={styles.title}>BÁO GIÁ</Text>
            <Text style={styles.code}>Mã số: {quotation.code}</Text>
            <Text style={styles.code}>Ngày: {new Date(quotation.created_at).toLocaleDateString('vi-VN')}</Text>
            {quotation.valid_until && (
              <Text style={styles.code}>Hiệu lực đến: {new Date(quotation.valid_until).toLocaleDateString('vi-VN')}</Text>
            )}
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.customerSection}>
          <Text style={styles.customerLabel}>Kính gửi: {quotation.contact?.name}</Text>
          {quotation.contact?.company && <Text>Công ty: {quotation.contact.company}</Text>}
          {quotation.contact?.email && <Text>Email: {quotation.contact.email}</Text>}
          {quotation.contact?.phone && <Text>Số điện thoại: {quotation.contact.phone}</Text>}
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Sản phẩm / Mô tả</Text>
            <Text style={styles.col2}>Số lượng</Text>
            <Text style={styles.col3}>Đơn giá</Text>
            <Text style={styles.col4}>Thành tiền</Text>
          </View>
          
          {quotation.items?.map((item: any, i: number) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.col1}>{item.product?.title || 'Sản phẩm'}</Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>{formatCurrency(item.unit_price)}</Text>
              <Text style={styles.col4}>{formatCurrency(item.total_price)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng phụ:</Text>
            <Text style={styles.totalValue}>{formatCurrency(quotation.subtotal)}</Text>
          </View>
          {quotation.discount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Chiết khấu thêm:</Text>
              <Text style={styles.totalValue}>-{formatCurrency(quotation.discount)}</Text>
            </View>
          )}
          {quotation.tax > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Thuế VAT (10%):</Text>
              <Text style={styles.totalValue}>{formatCurrency(quotation.tax)}</Text>
            </View>
          )}
          <View style={[styles.totalRow, styles.finalTotal]}>
            <Text style={{ fontWeight: 'bold' }}>TỔNG CỘNG:</Text>
            <Text style={{ fontWeight: 'bold' }}>{formatCurrency(quotation.total)}</Text>
          </View>
        </View>

        {/* Notes */}
        {quotation.notes && (
          <View style={styles.notes}>
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Ghi chú & Điều khoản:</Text>
            <Text>{quotation.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.signature}>
            <Text style={{ fontWeight: 'bold' }}>ĐẠI DIỆN KHÁCH HÀNG</Text>
            <View style={styles.signatureLine} />
            <Text>(Ký & Ghi rõ họ tên)</Text>
          </View>
          <View style={styles.signature}>
            <Text style={{ fontWeight: 'bold' }}>ĐẠI DIỆN CÔNG TY</Text>
            <View style={styles.signatureLine} />
            <Text>Giám đốc Kinh Doanh</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
