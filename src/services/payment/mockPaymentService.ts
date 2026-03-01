import type { IPaymentService } from './paymentService';
import type { PaymentPayload, PaymentResult } from '../../types';

export class MockPaymentService implements IPaymentService {
  async processPayment(payload: PaymentPayload): Promise<PaymentResult> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    return {
      success: true,
      orderId: payload.orderId,
      transactionId,
      message: 'Payment processed successfully.',
      timestamp: new Date().toISOString(),
    };
  }
}
