import type { PaymentPayload, PaymentResult } from '../../types';
import { MockPaymentService } from './mockPaymentService';

export interface IPaymentService {
  processPayment(payload: PaymentPayload): Promise<PaymentResult>;
}

export function createPaymentService(): IPaymentService {
  // To swap in a real payment server, implement IPaymentService and return it here.
  // E.g.: if (import.meta.env.VITE_PAYMENT_PROVIDER === 'stripe') return new StripePaymentService();
  return new MockPaymentService();
}
