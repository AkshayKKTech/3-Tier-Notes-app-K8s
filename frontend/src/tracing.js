import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'react-frontend',
  }),
});

const exporter = new OTLPTraceExporter({
  url: '/v1/traces', // or your OTLP collector endpoint
});

provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register();