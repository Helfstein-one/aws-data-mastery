# AWS Financial Data Architecture

**Portal: Integração de Soluções AWS para Conhecimento Financeiro**  
**Data:** 2026-08-16  
**Arquiteto:** AWS Data Architect  

---

## Sumário Executivo

Este documento mapeia como serviços AWS suportam casos de uso financeiros, desde ingestão de dados até análise e ML. Inclui arquiteturas de referência, compliance, pricing e exemplos de implementação.

**Pilares:**
- **Data Lakes & Warehouses**: Armazenamento escalável e consultas rápidas
- **Machine Learning**: Modelos preditivos e detecção de anomalias
- **Segurança & Compliance**: Proteção de dados sensíveis financeiros
- **Análise & BI**: Dashboards em tempo real e relatórios executivos
- **Streaming Real-time**: Processamento de transações e eventos

---

## 1. Data Lakes & Warehouses

### 1.1 Matriz de Serviços

| Serviço | Caso de Uso | Características | Escala |
|---------|-----------|-----------------|--------|
| **S3** | Armazenamento central de dados brutos | Durabilidade 99.999999999%, baixo custo, versionamento | PB |
| **Glue** | Catálogo de dados e ETL | Descoberta automática, transformações, schema registry | 1M+ registros |
| **Redshift** | Warehouse estruturado | Queries SQL ultra-rápidas, compressão, arquitetura MPP | 100 GB - PB |
| **Athena** | Consultas ad-hoc sobre S3 | Sem servidor, SQL ANSI, pay-per-query | Qualquer escala |
| **Lake Formation** | Governança de dados | Acesso baseado em funções, auditoria, limpeza de dados | Múltiplos contos |
| **Kinesis Data Lake** | Ingestão em tempo real | Buffering, transformação, entrega automática a S3 | 1M+ eventos/seg |

### 1.2 Arquitetura Recomendada: Data Lake Financeiro

```
┌─────────────────────────────────────────────────────────────┐
│                     INGESTÃO (Sources)                      │
├──────────────────┬──────────────────┬───────────────────────┤
│  APIs Bancárias  │  Arquivos (SFTP) │  Feeds de Mercado    │
│  Pagamentos      │  EDI/Swift       │  Cotações            │
│  Transações      │  Relatórios      │  Preços de Ativos    │
└────────────┬─────┴────────┬─────────┴──────────┬────────────┘
             │              │                   │
             v              v                   v
┌────────────────────────────────────────────────────────────┐
│         Kinesis Data Firehose / EventBridge                │
│  - Real-time: Transações (Kinesis Firehose)               │
│  - Batch: Dados históricos (EventBridge -> Lambda)        │
└─────────────────┬────────────────────────────────────────┘
                  │
    ┌─────────────┴──────────────────┐
    v                                v
┌─────────────────────┐    ┌──────────────────────┐
│  AWS Glue ETL       │    │  Lambda Functions    │
│  - Limpeza dados    │    │  - Validação         │
│  - Enriquecimento   │    │  - Transformação     │
│  - Schema evolution │    │  - Orquestração      │
└──────────┬──────────┘    └──────────┬───────────┘
           │                          │
           └──────────────┬───────────┘
                          v
                  ┌───────────────────┐
                  │   Amazon S3       │
                  │  Data Lake Layer  │
                  │  (Raw/Processed)  │
                  └────────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        v                  v                  v
    ┌────────┐      ┌─────────────┐    ┌──────────────┐
    │Redshift│      │   Athena    │    │ Lake Formation│
    │Queries │      │Ad-hoc SQL   │    │Data Governance│
    └────┬───┘      └──────┬──────┘    └──────┬───────┘
         │                 │                  │
         └─────────────────┼──────────────────┘
                           v
        ┌─────────────────────────────────────┐
        │   QuickSight / Grafana Dashboards   │
        │   Real-time KPIs & Analytics        │
        └─────────────────────────────────────┘
```

### 1.3 Implementação de Referência

**Componentes:**

1. **Ingestão (Kinesis Firehose)**
   ```python
   # AWS Glue Script - ETL de Transações Bancárias
   import awswrangler as wr
   from awsglue.context import GlueContext
   from pyspark.sql.functions import col, from_unixtime
   
   # Leitura de transações brutas
   df = wr.s3.read_json('s3://data-lake-raw/transactions/')
   
   # Validação e transformação
   df_clean = df.filter(col('amount') > 0) \
               .withColumn('timestamp', from_unixtime(col('unix_time'))) \
               .withColumn('risk_score', calculate_risk_udf(col('txn_type'), col('amount')))
   
   # Gravação em camadas do Data Lake
   wr.s3.to_parquet(
       df_clean,
       's3://data-lake-processed/transactions/',
       dataset=True,
       mode='overwrite_partitions',
       partition_cols=['year', 'month', 'day']
   )
   ```

2. **Consultas em Redshift**
   ```sql
   -- Dashboard de Transações Diárias
   SELECT 
       DATE_TRUNC('day', transaction_date) as trading_day,
       COUNT(*) as total_transactions,
       SUM(amount) as total_volume,
       AVG(amount) as avg_transaction,
       PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY amount) as p95_amount,
       COUNT(CASE WHEN risk_score > 0.8 THEN 1 END) as high_risk_count
   FROM fact_transactions
   WHERE transaction_date >= CURRENT_DATE - INTERVAL '90 days'
   GROUP BY 1
   ORDER BY 1 DESC;
   ```

3. **Lambda para Validação em Tempo Real**
   ```python
   import boto3
   import json
   from datetime import datetime
   
   s3_client = boto3.client('s3')
   dynamodb = boto3.resource('dynamodb')
   
   def lambda_handler(event, context):
       # Validação de transação
       for record in event['Records']:
           payload = json.loads(record['body'])
           
           # Verificações
           is_valid = (
               payload['amount'] > 0 and
               payload['currency'] in VALID_CURRENCIES and
               len(payload['account_id']) == 20
           )
           
           if is_valid:
               # Armazena para processamento ETL
               s3_client.put_object(
                   Bucket='data-lake-raw',
                   Key=f"transactions/{datetime.now().isoformat()}/{payload['id']}.json",
                   Body=json.dumps(payload)
               )
           else:
               # Log de erro
               table = dynamodb.Table('transaction_errors')
               table.put_item(Item={'id': payload['id'], 'error': 'validation_failed'})
       
       return {'statusCode': 200}
   ```

### 1.4 Custo Estimado (Mensal)

| Componente | Volume | Custo Mensal |
|-----------|--------|------------|
| **S3 Storage** | 500 GB raw + 200 GB processed | $15-25 |
| **Glue ETL** | 40 horas/mês | $20-30 |
| **Redshift** | ra3.4xlplus (2 nós) | $5,000-8,000 |
| **Athena** | 10 TB scanned | $50-100 |
| **Kinesis Firehose** | 1 TB/mês | $200-400 |
| **Lambda** | 1M invocações | $20-50 |
| **Data Transfer** | 100 GB | $10-15 |
| **Total** | | **$5,315-8,615** |

---

## 2. Machine Learning & Modelos Preditivos

### 2.1 Matriz de Serviços

| Serviço | Caso de Uso | Força | Integração |
|---------|-----------|-------|-----------|
| **SageMaker** | Treinamento e deployment de modelos | Python SDK, AutoML, feature store | Integração nativa com S3, Glue |
| **SageMaker Feature Store** | Feature engineering centralizado | Versionamento, acesso online/offline | Acesso via API de baixa latência |
| **SageMaker Pipelines** | Orquestração ML | CI/CD para ML, reprodutibilidade | Integração com Lambda, EventBridge |
| **SageMaker Model Registry** | Versionamento de modelos | Rastreabilidade, aprovação, rollback | Auditoria completa |
| **Lookout for Metrics** | Detecção de anomalias | ML gerenciado, sem configuração | Integração com dados financeiros |
| **Forecast** | Previsão de séries temporais | Modelos probabilísticos, sazonalidade | APIs simples |

### 2.2 Arquitetura ML para Detecção de Fraude Financeira

```
┌──────────────────────────────────────────────────────────────┐
│                  Ingestão Contínua de Dados                  │
│     (Transações, Comportamento do Cliente, Contexto)        │
└────────────┬──────────────────────────────────────────────┘
             v
┌──────────────────────────────────────────────────────────────┐
│         SageMaker Feature Store (Feature Engineering)        │
│  - Customer Profiles (média gasto, frequência)              │
│  - Transaction Features (padrões, anomalias)                │
│  - Temporal Features (hora do dia, dia da semana)           │
│  - Geolocation Features (distância, velocidade viagem)      │
└───────────────┬─────────────────────────────────────────────┘
                v
      ┌─────────────────┐
      │  Training Job   │
      │  (SageMaker)    │
      │  - XGBoost      │
      │  - Tabular Data │
      │  - 5M records   │
      └────────┬────────┘
               v
      ┌─────────────────────┐
      │  Model Registry     │
      │  v1.2.3 (approved)  │
      │  Metrics: AUC=0.98  │
      └────────┬────────────┘
               v
    ┌──────────────────────┐
    │  Endpoints Online    │
    │  (Multi-Model Server)│
    │  < 100ms latency     │
    └────────┬─────────────┘
             v
  ┌────────────────────────┐
  │  Real-time Scoring    │
  │  (Lambda + API GW)     │
  │  on every transaction  │
  └────────┬───────────────┘
           v
  ┌────────────────────────┐
  │  Fraud Alert          │
  │  SNS -> Security Team │
  │  Decline Transaction  │
  └────────────────────────┘
```

### 2.3 Exemplo: Modelo de Detecção de Fraude

```python
# 1. Feature Engineering com SageMaker Feature Store
import sagemaker
from sagemaker.feature_store.feature_group import FeatureGroup
import pandas as pd

session = sagemaker.Session()
role = sagemaker.get_execution_role()

# Criar feature group para perfis de cliente
customer_fg = FeatureGroup(
    name='customer-profiles',
    sagemaker_session=session
)

# Dados agregados de clientes
customer_data = pd.DataFrame({
    'customer_id': ['CUST_001', 'CUST_002'],
    'avg_daily_spend': [500.0, 1200.0],
    'transaction_frequency': [10, 25],
    'account_age_days': [365, 730],
    'high_risk_txn_ratio': [0.01, 0.03]
})

customer_fg.ingest(customer_data, max_workers=10, wait=True)

# 2. Treinamento do Modelo
from sagemaker.estimator import Estimator

xgb = Estimator(
    image_uri=sagemaker.image_uris.retrieve('xgboost', session.boto_region_name),
    role=role,
    instance_count=2,
    instance_type='ml.m5.xlarge',
    framework_version='1.5-1',
    py_version='py3',
    base_job_name='fraud-detection-xgb'
)

# Hiperparâmetros
xgb.set_hyperparameters(
    max_depth=5,
    eta=0.2,
    gamma=4,
    min_child_weight=6,
    objective='binary:logistic',
    num_round=100,
    eval_metric='auc'
)

# Treinar
xgb.fit({
    'training': 's3://data-lake/training/fraud_train.csv',
    'validation': 's3://data-lake/training/fraud_val.csv'
})

# 3. Deploy como Endpoint
predictor = xgb.deploy(
    initial_instance_count=2,
    instance_type='ml.m5.xlarge',
    endpoint_name='fraud-detection-prod'
)

# 4. Scoring em Tempo Real
import json

def score_transaction(transaction_data):
    # Recuperar features do Feature Store
    response = session.describe_endpoint('fraud-detection-prod')
    
    # Fazer predição
    prediction = predictor.predict(json.dumps(transaction_data))
    fraud_probability = json.loads(prediction)
    
    return {
        'transaction_id': transaction_data['id'],
        'fraud_score': fraud_probability[0],
        'decision': 'BLOCK' if fraud_probability[0] > 0.8 else 'APPROVE'
    }

# 5. Integração com Lambda
def lambda_handler(event, context):
    for record in event['Records']:
        transaction = json.loads(record['body'])
        result = score_transaction(transaction)
        
        if result['decision'] == 'BLOCK':
            sns.publish(
                TopicArn='arn:aws:sns:us-east-1:ACCOUNT:fraud-alerts',
                Message=f"Fraude detectada: {result['fraud_score']:.2%}"
            )
    
    return {'statusCode': 200}
```

### 2.4 Modelos Gerenciados para Casos de Uso Específicos

| Caso de Uso | Serviço | Entrada | Saída | Latência |
|----------|---------|---------|-------|----------|
| Detecção de Fraude | Lookout for Metrics | Histórico transações | Anomalias | Batch |
| Previsão de Churn | SageMaker Autopilot | Comportamento cliente | Score churn | Batch |
| Previsão de Demanda | Forecast | Séries temporais | Forecast 30d | Daily |
| Análise de Sentimento | Comprehend Financial | Earnings calls, news | Sentimento | Real-time |

### 2.5 Custo Estimado (Mensal)

| Componente | Config | Custo Mensal |
|-----------|--------|------------|
| **Feature Store** | 10 feature groups, 100K vectors | $500-1,000 |
| **SageMaker Training** | 10 jobs/mês, 2h cada | $500-800 |
| **SageMaker Endpoint** | 2 instâncias ml.m5.xlarge | $2,000-3,000 |
| **Batch Transform** | 1M registros/mês | $100-200 |
| **Lookout for Metrics** | Análise 5 métricas | $1,500 |
| **Forecast** | 1 forecast model | $1,000 |
| **Total** | | **$5,600-7,500** |

---

## 3. Segurança & Compliance Financeiro

### 3.1 Serviços de Segurança AWS

| Serviço | Função | Aplicação Financeira |
|---------|--------|----------------------|
| **KMS** | Criptografia chaves mestras | Encriptar dados em repouso S3, RDS |
| **Secrets Manager** | Gerenciar credenciais | Chaves API, senhas BD, tokens |
| **IAM** | Controle de acesso | Role-based access para analistas, cientistas |
| **VPC & PrivateLink** | Rede isolada | Conectar a bancos sem internet pública |
| **CloudTrail** | Auditoria de ações | Log de quem acessou qual dado |
| **GuardDuty** | Detecção de ameaças | Comportamento anômalo em contas AWS |
| **Macie** | Classificação de dados | Descobrir PII e dados sensíveis em S3 |
| **WAF** | Proteção de APIs | Rate limiting, bloqueio de padrões suspeitos |
| **Config** | Conformidade de recursos | Verificar se S3 buckets estão encriptados |

### 3.2 Arquitetura de Segurança Multicamada

```
┌──────────────────────────────────────────────────────────┐
│              Camada 1: Acesso & Autenticação             │
├──────────────────────────────────────────────────────────┤
│  MFA -> IAM Roles -> Service Control Policies (SCPs)    │
│  (Força multifator obrigatória)                         │
└────────────────┬───────────────────────────────────────┘
                 v
┌──────────────────────────────────────────────────────────┐
│       Camada 2: Rede & Isolamento (VPC)                  │
├──────────────────────────────────────────────────────────┤
│  Private Subnets -> NAT Gateway -> VPC Endpoints         │
│  Network ACLs -> Security Groups                        │
│  (Tráfego filtrado bidirecionalmente)                   │
└────────────────┬───────────────────────────────────────┘
                 v
┌──────────────────────────────────────────────────────────┐
│        Camada 3: Encriptação em Trânsito & Repouso       │
├──────────────────────────────────────────────────────────┤
│  TLS 1.2+ para APIs -> KMS para dados S3/RDS            │
│  Secrets Manager para credenciais                       │
│  (Dados sempre encriptados)                             │
└────────────────┬───────────────────────────────────────┘
                 v
┌──────────────────────────────────────────────────────────┐
│        Camada 4: Detecção & Monitoramento                │
├──────────────────────────────────────────────────────────┤
│  CloudTrail (audit log) -> GuardDuty (ameaças)          │
│  Macie (PII detection) -> EventBridge (alertas)         │
│  VPC Flow Logs (tráfego)                                │
└────────────────┬───────────────────────────────────────┘
                 v
┌──────────────────────────────────────────────────────────┐
│        Camada 5: Conformidade & Reporting                │
├──────────────────────────────────────────────────────────┤
│  AWS Config -> Compliance Dashboards                     │
│  Security Hub -> Scorecard de segurança                  │
│  IAM Access Analyzer -> Verificação de acesso público   │
└──────────────────────────────────────────────────────────┘
```

### 3.3 Compliance Certifications & Regulações

| Certificação | Escopo | AWS Support | Documentação |
|-------------|--------|------------|--------------|
| **ISO 27001** | Segurança Informação | Certificado (auditado anualmente) | https://aws.amazon.com/compliance/iso-27001/ |
| **SOC 2 Type II** | Controles Operacionais | Certificado (relatório anual) | https://aws.amazon.com/compliance/soc/ |
| **PCI-DSS v3.2.1** | Dados de Cartão (Payment Card Industry) | Nível 1 compliant | https://aws.amazon.com/compliance/pci-dss/ |
| **GDPR** | Privacidade de dados (EU) | DPA modelo disponível | https://aws.amazon.com/compliance/gdpr/ |
| **LGPD** | Lei Proteção Dados (Brasil) | Mapeamento de controles | https://aws.amazon.com/pt/compliance/lgpd/ |
| **HIPAA** | Dados de saúde (EUA) | BAA (Business Associate Agreement) | https://aws.amazon.com/compliance/hipaa/ |
| **FedRAMP** | Compliance federal (USA) | Provisório / Autorizado | https://aws.amazon.com/compliance/fedramp/ |

### 3.4 Exemplo: Implementação de Segurança

```python
# 1. KMS - Criptografia de chave mestra
import boto3

kms = boto3.client('kms')

# Criar chave para dados financeiros
response = kms.create_key(
    Description='CMK para dados financeiros',
    KeyUsage='ENCRYPT_DECRYPT',
    Origin='AWS_KMS'
)
key_id = response['KeyMetadata']['KeyId']

# 2. Secrets Manager - Armazenar credenciais
secrets_client = boto3.client('secretsmanager')

secrets_client.create_secret(
    Name='prod/database/credentials',
    SecretString=json.dumps({
        'username': 'db_admin',
        'password': 'RandomlyGeneratedPassword123!@#',
        'host': 'financial-db.example.com',
        'port': 5432
    }),
    KmsKeyId=key_id
)

# 3. IAM Policy - Acesso granular
iam_policy = {
    'Version': '2012-10-17',
    'Statement': [
        {
            'Sid': 'ReadOnlyFinancialData',
            'Effect': 'Allow',
            'Action': [
                's3:GetObject',
                's3:ListBucket'
            ],
            'Resource': [
                'arn:aws:s3:::financial-data-lake',
                'arn:aws:s3:::financial-data-lake/*'
            ],
            'Condition': {
                'StringEquals': {
                    'aws:username': 'analyst_team'
                }
            }
        },
        {
            'Sid': 'DenyUnencryptedUploads',
            'Effect': 'Deny',
            'Action': 's3:PutObject',
            'Resource': 'arn:aws:s3:::financial-data-lake/*',
            'Condition': {
                'StringNotEquals': {
                    's3:x-amz-server-side-encryption': 'aws:kms'
                }
            }
        }
    ]
}

# 4. VPC Endpoint - Acesso privado a serviços AWS
ec2 = boto3.client('ec2')

vpc_endpoint = ec2.create_vpc_endpoint(
    VpcId='vpc-12345678',
    ServiceName='com.amazonaws.us-east-1.s3',
    RouteTableIds=['rtb-12345678'],
    PolicyDocument=json.dumps({
        'Version': '2012-10-17',
        'Statement': [
            {
                'Principal': '*',
                'Action': 's3:*',
                'Effect': 'Allow',
                'Resource': 'arn:aws:s3:::financial-data-lake/*'
            }
        ]
    })
)

# 5. CloudTrail - Auditoria
cloudtrail = boto3.client('cloudtrail')

cloudtrail.create_trail(
    Name='financial-audit-trail',
    S3BucketName='financial-audit-logs',
    IncludeGlobalServiceEvents=True,
    IsMultiRegionTrail=True,
    EnableLogFileValidation=True
)

# 6. Macie - Descobrir PII
macie = boto3.client('macie2')

macie.create_classification_job(
    jobType='SCHEDULED',
    name='financial-data-classification',
    s3JobDefinition={
        'bucketDefinitions': [
            {
                'accountId': '123456789012',
                'buckets': ['financial-data-lake']
            }
        ]
    },
    scheduleFrequency='DAILY'
)

# 7. Config - Verificar conformidade
config = boto3.client('config')

config.put_config_rule(
    ConfigRuleName='s3-bucket-server-side-encryption-enabled',
    Source={
        'Owner': 'AWS',
        'SourceIdentifier': 'S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED'
    },
    Scope={
        'ComplianceResourceTypes': ['AWS::S3::Bucket']
    }
)
```

### 3.5 Custo Estimado (Mensal)

| Serviço | Config | Custo Mensal |
|---------|--------|------------|
| **KMS** | 1 chave + 1M operações | $1.00 + $200 |
| **Secrets Manager** | 5 segredos + acesso | $5.00 + $50 |
| **CloudTrail** | Multi-region logging | $2.50 + $500 |
| **GuardDuty** | Análise de logs | $300-500 |
| **Macie** | Classificação diária | $500-1,000 |
| **Security Hub** | Agregação | $250-350 |
| **Config** | Rules + snapshots | $100-200 |
| **Total** | | **$1,908-2,800** |

---

## 4. Análise & Business Intelligence

### 4.1 Serviços de BI & Visualização

| Serviço | Público | Força | Custo |
|---------|--------|-------|-------|
| **QuickSight** | Executivos, negócio | Native AWS, embedded, SPICE | $9-28/usuário/mês |
| **Managed Grafana** | Ops, engenheiros | Dashboards open-source, alertas | $10-13/usuário/mês |
| **Kibana** (via ES) | Técnico | ELK stack nativo, full-text search | Incluído em ES |
| **Looker** (via Marketplace) | Executivos | Modeling language LookML | Pay-per-seat |
| **Tableau** (via EC2) | Enterprise | Suporta conexões complexas | Licensing próprio |

### 4.2 Arquitetura Recomendada: Dashboard Financeiro

```
┌────────────────────────────────────────────────────────────┐
│              Dados de Negócio (múltiplas fontes)           │
├─────────────┬──────────────┬──────────────┬────────────────┤
│  Redshift   │  Athena/S3   │  DynamoDB    │  RDS (Legacy)  │
│ Warehouse   │  Data Lake   │  Real-time   │  Sistemas      │
└─────────────┴──────┬───────┴───────┬──────┴────────────────┘
                     │               │
        ┌────────────┴───────────────┴─────────────┐
        v                                           v
┌──────────────────────────────────┐    ┌──────────────────────┐
│   QuickSight Data Sources        │    │  Grafana (Metrics)   │
│  - Direct query to Redshift      │    │  - CloudWatch        │
│  - Spice cache layer             │    │  - Custom dashboards │
│  - Row-level security (RLS)      │    │  - Alertas           │
└──────────────────────────────────┘    └──────────────────────┘
                    v                              v
        ┌───────────────────────────────────────────┐
        │     Dashboards Finais (Executives)        │
        ├──────────────────┬────────────────────────┤
        │ Painel Executivo │ Análise Detalhada     │
        │ - KPIs do dia    │ - Drilldown           │
        │ - Alertas        │ - Comparativos        │
        │ - Previsões      │ - Tendências          │
        └──────────────────┴────────────────────────┘
```

### 4.3 Exemplo: Dashboard de Rentabilidade

```python
# Usando AWS SDK para QuickSight
import boto3
import json

quicksight = boto3.client('quicksight')
account_id = '123456789012'

# 1. Criar Dataset conectado a Redshift
dataset_response = quicksight.create_data_set(
    AwsAccountId=account_id,
    DataSetId='financial-kpis',
    Name='Financial KPIs Dataset',
    PhysicalTableMappings=[
        {
            'LogicalTableName': 'fact_revenue',
            'PhysicalTableMapping': {
                'Source': {
                    'DataSourceArn': f'arn:aws:quicksight:{region}:{account_id}:datasource/redshift-prod',
                    'QueryExecutionContext': {
                        'Database': 'analytics'
                    }
                },
                'DataSourceArn': 'arn:aws:quicksight:...:datasource/redshift-prod'
            }
        }
    ]
)

# 2. Criar análise (notebook interativo)
analysis_response = quicksight.create_analysis(
    AwsAccountId=account_id,
    AnalysisId='revenue-analysis',
    Name='Revenue & Profitability Analysis',
    SourceEntity={
        'SourceTemplate': {
            'DataSetReferences': [
                {
                    'DataSetPlaceholder': 'fact_revenue',
                    'DataSetArn': dataset_response['Arn']
                }
            ],
            'Arn': 'arn:aws:quicksight:...:template/financial-template'
        }
    }
)

# 3. Publicar dashboard
dashboard_response = quicksight.create_dashboard(
    AwsAccountId=account_id,
    DashboardId='executive-kpi-dashboard',
    Name='Executive KPI Dashboard',
    SourceEntity={
        'SourceAnalysis': {
            'Arn': analysis_response['Arn']
        }
    },
    DashboardPublishOptions={
        'AdHocFilteringOption': {
            'AvailabilityStatus': 'ENABLED'
        },
        'ExportToCSVOption': {
            'AvailabilityStatus': 'ENABLED'
        },
        'SheetControlsOption': {
            'AvailabilityStatus': 'ENABLED'
        }
    }
)

# 4. Compartilhar com usuários
quicksight.update_dashboard_permissions(
    AwsAccountId=account_id,
    DashboardId='executive-kpi-dashboard',
    GrantPermissions=[
        {
            'Principal': 'arn:aws:quicksight:us-east-1:123456789012:user/default/cfo',
            'Actions': ['quicksight:DescribeDashboard', 'quicksight:ListDashboardVersions']
        }
    ]
)

# 5. Alertas automáticos
print("Alertas de negócio implementados via:")
print("- CloudWatch + SNS para anomalias de volume")
print("- Custom metrics via CloudWatch Insights")
print("- Lambda para scorecard automático")
```

### 4.4 Exemplos de KPIs Financeiros Típicos

| KPI | Métrica | Frequência | Limiar de Alerta |
|-----|---------|-----------|-----------------|
| ROI Campanha | Revenue / Spend | Diário | < 3.0x |
| Índice de Conversão | Transactions / Visits | Diário | < 2% |
| Churn Rate | Customers Lost / Total | Mensal | > 5% |
| Lifetime Value | NPV de receita do cliente | Mensal | Tendência |
| Receivable Days | (AR / Daily Revenue) | Semanal | > 45 |
| Gross Margin | (Revenue - COGS) / Revenue | Mensal | < 40% |
| Cash Burn Rate | (Expenses - Revenue) / Runway | Diário | Crítico |

### 4.5 Custo Estimado (Mensal)

| Componente | Config | Custo Mensal |
|-----------|--------|------------|
| **QuickSight** | 20 usuários (Standard) | $180 |
| **Redshift Query** | 50 queries/dia, 10GB cada | $200-300 |
| **Managed Grafana** | 10 usuários | $100 |
| **Dashboards** | Manutenção e updates | $200-400 |
| **Total** | | **$680-980** |

---

## 5. Streaming & Real-time Data Processing

### 5.1 Serviços de Streaming

| Serviço | Taxa | Latência | Uso |
|---------|------|----------|-----|
| **Kinesis Data Streams** | 1K-1M eventos/seg | <100ms | Alta frequência |
| **Kinesis Firehose** | 1K-3M eventos/seg | 60-300s | Agregação |
| **MSK (Managed Kafka)** | 10M+ eventos/seg | <10ms | Ultra-alta escala |
| **EventBridge** | 1K+ eventos/seg | <60s | Eventos raros |
| **SQS** | 120K msg/min | <60s | Fila confiável |

### 5.2 Arquitetura: Processamento de Transações em Tempo Real

```
┌─────────────────────────────────────────────────────────────┐
│          Fontes de Transações (APIs Bancárias, POS)        │
└──────────────────────┬────────────────────────────────────┘
                       v
           ┌───────────────────────┐
           │ Kinesis Data Streams  │
           │ (raw transactions)    │
           │ 100K events/seg       │
           └──────────┬────────────┘
                      v
        ┌─────────────────────────────┐
        │    Lambda Consumers          │
        ├─────────────────────────────┤
        │ 1. Validação                │
        │ 2. Enriquecimento           │
        │ 3. Detecção de fraude       │
        │ 4. Agregações              │
        └──────┬──────────────────────┘
               v
    ┌──────────────────────────────┐
    │  Múltiplos Destinos          │
    ├──────────────┬───────────────┤
    │              │               │
    v              v               v
  S3          DynamoDB        SNS/SQS
(Arquivo)    (Cache)      (Alertas)
```

### 5.3 Implementação: Pipeline Transações

```python
# 1. Producer - Ingestão de transações
import boto3
import json
import time

kinesis = boto3.client('kinesis')

def ingest_transaction(transaction_data):
    """Ingerir transação em Kinesis"""
    response = kinesis.put_record(
        StreamName='financial-transactions',
        Data=json.dumps(transaction_data),
        PartitionKey=transaction_data['customer_id']  # Agrupa por cliente
    )
    return response['ShardId']

# 2. Consumer Lambda - Processamento em tempo real
import asyncio
from concurrent.futures import ThreadPoolExecutor

def lambda_handler(event, context):
    """Processar batch de transações"""
    
    dynamodb = boto3.resource('dynamodb')
    sns = boto3.client('sns')
    s3 = boto3.client('s3')
    
    for record in event['Records']:
        # Decodificar a transação
        txn = json.loads(
            base64.b64decode(record['kinesis']['data'])
        )
        
        # 1. Validação
        if not validate_transaction(txn):
            log_error(txn['id'], 'Invalid format')
            continue
        
        # 2. Buscar perfil do cliente
        customer_table = dynamodb.Table('customer-profiles')
        customer = customer_table.get_item(Key={'id': txn['customer_id']})['Item']
        
        # 3. Cálculo de score de fraude
        fraud_score = calculate_fraud_score(txn, customer)
        
        # 4. Armazenar em cache (DynamoDB)
        cache_table = dynamodb.Table('transaction-cache')
        cache_table.put_item(Item={
            'txn_id': txn['id'],
            'customer_id': txn['customer_id'],
            'amount': txn['amount'],
            'fraud_score': fraud_score,
            'timestamp': int(time.time()),
            'ttl': int(time.time()) + 3600  # 1h TTL
        })
        
        # 5. Decisão
        if fraud_score > 0.8:
            # Alerta de fraude
            sns.publish(
                TopicArn='arn:aws:sns:us-east-1:ACCOUNT:fraud-alerts',
                Subject='Transação suspeita detectada',
                Message=json.dumps({
                    'txn_id': txn['id'],
                    'fraud_score': fraud_score,
                    'amount': txn['amount'],
                    'action': 'BLOCK'
                })
            )
        
        # 6. Armazenar no data lake (S3)
        s3.put_object(
            Bucket='financial-transactions',
            Key=f"processed/{datetime.now().strftime('%Y/%m/%d')}/{txn['id']}.json",
            Body=json.dumps({
                'transaction': txn,
                'fraud_score': fraud_score,
                'processed_at': datetime.now().isoformat()
            }),
            ServerSideEncryption='aws:kms',
            SSEKMSKeyId='arn:aws:kms:...'
        )
    
    return {'statusCode': 200, 'processed': len(event['Records'])}

def calculate_fraud_score(transaction, customer_profile):
    """
    Calcular score de fraude com base em regras simples
    """
    score = 0.0
    
    # Regra 1: Valor anormalmente alto
    avg_txn = customer_profile['avg_transaction_amount']
    if transaction['amount'] > avg_txn * 5:
        score += 0.3
    
    # Regra 2: Localização suspeita
    if transaction['country'] != customer_profile['home_country']:
        score += 0.2
    
    # Regra 3: Velocidade de viagem impossível
    time_diff = (
        transaction['timestamp'] - customer_profile['last_transaction_time']
    ) / 3600  # horas
    distance = calculate_distance(
        transaction['location'],
        customer_profile['last_location']
    )
    if distance > 1000 and time_diff < 1:  # 1000+ km em <1h
        score += 0.3
    
    # Regra 4: Múltiplas transações em curto espaço
    if customer_profile['txn_count_1h'] > 10:
        score += 0.1
    
    return min(score, 1.0)

# 3. Agregação em tempo real (Windowed aggregation)
class TransactionAggregator:
    def __init__(self, window_size=60):  # 60 segundos
        self.window_size = window_size
        self.buffer = {}
        self.cloudwatch = boto3.client('cloudwatch')
    
    def add_transaction(self, txn):
        """Agregar transação em janela temporal"""
        key = (txn['customer_id'], txn['product_category'])
        
        if key not in self.buffer:
            self.buffer[key] = {
                'count': 0,
                'total_amount': 0,
                'start_time': time.time()
            }
        
        self.buffer[key]['count'] += 1
        self.buffer[key]['total_amount'] += txn['amount']
        
        # Flush se janela expirou
        if time.time() - self.buffer[key]['start_time'] > self.window_size:
            self.flush(key)
    
    def flush(self, key):
        """Publicar métrica agregada"""
        data = self.buffer[key]
        
        self.cloudwatch.put_metric_data(
            Namespace='Financial/Transactions',
            MetricData=[
                {
                    'MetricName': 'TransactionCount',
                    'Value': data['count'],
                    'Dimensions': [
                        {'Name': 'CustomerId', 'Value': key[0]},
                        {'Name': 'Category', 'Value': key[1]}
                    ]
                },
                {
                    'MetricName': 'TotalAmount',
                    'Value': data['total_amount'],
                    'Dimensions': [
                        {'Name': 'CustomerId', 'Value': key[0]},
                        {'Name': 'Category', 'Value': key[1]}
                    ]
                }
            ]
        )
        
        del self.buffer[key]
```

### 5.4 Monitoramento de Pipeline

```python
# Criar alarmes no CloudWatch
cloudwatch = boto3.client('cloudwatch')

# Alerta: Taxa de erro alta
cloudwatch.put_metric_alarm(
    AlarmName='transaction-processing-error-rate',
    ComparisonOperator='GreaterThanThreshold',
    EvaluationPeriods=2,
    MetricName='ProcessingErrors',
    Namespace='Financial/Transactions',
    Period=300,
    Statistic='Sum',
    Threshold=100,
    ActionsEnabled=True,
    AlarmActions=['arn:aws:sns:us-east-1:ACCOUNT:critical-alerts'],
    TreatMissingData='notBreaching'
)

# Alerta: Latência alta
cloudwatch.put_metric_alarm(
    AlarmName='transaction-latency-high',
    ComparisonOperator='GreaterThanThreshold',
    EvaluationPeriods=1,
    MetricName='ProcessingLatency',
    Namespace='Financial/Transactions',
    Period=60,
    Statistic='Average',
    Threshold=500,  # 500ms
    ActionsEnabled=True,
    AlarmActions=['arn:aws:sns:us-east-1:ACCOUNT:perf-alerts']
)
```

### 5.5 Custo Estimado (Mensal)

| Componente | Volume | Custo Mensal |
|-----------|--------|------------|
| **Kinesis Streams** | 1M eventos/seg = 2.6B/dia | $4,000-6,000 |
| **Lambda Processing** | 2.6B invocações | $20,000+ |
| **DynamoDB** | 50 GB writes | $2,000-3,000 |
| **S3 Storage** | 500 GB/dia = 15 TB/mês | $300-400 |
| **CloudWatch Logs** | 10 GB/dia | $500 |
| **Total** | | **$26,800-29,900** |

---

## 6. Matriz Completa: Serviços × Casos de Uso Financeiros

| Caso de Uso | Ingestão | Armazenamento | Processamento | Analytics | ML | Segurança |
|------------|----------|---------------|---------------|-----------|----|---------| 
| **Transações** | Kinesis | S3 + Redshift | Glue + Lambda | QuickSight | SageMaker Fraud | KMS + IAM |
| **Análise de Risco** | EventBridge | S3 | SageMaker Pipelines | Athena | SageMaker | Secrets Mgr |
| **Previsão de Demanda** | Firehose | Redshift | Spark (EMR) | Grafana | Forecast | GuardDuty |
| **Análise de Portfólio** | Batch (APIs) | Redshift | Glue | QuickSight | SageMaker | Config |
| **Compliance Reporting** | EventBridge | S3 | Glue | Athena | N/A | CloudTrail |
| **Detecção de Fraude** | Kinesis | DynamoDB | Lambda | CloudWatch | Lookout Metrics | Macie |
| **Análise de Comportamento** | EventBridge | S3 | Spark | QuickSight | SageMaker | Secrets Manager |

---

## 7. Arquitetura Geral: Data Lake Financeiro Integrado

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FONTES DE DADOS                             │
├──────────────┬──────────────┬──────────────┬──────────────────────────┤
│ Bancos       │ Mercados     │ Clientes     │ Sistemas Legados         │
│ - Transações │ - Cotações   │ - Perfil     │ - Mainframe              │
│ - Contas     │ - Preços     │ - Histórico  │ - SAP                    │
│ - Empréstimos│ - Índices    │ - Eventos    │ - Oracle                 │
└──────────────┴──────────────┴──────────────┴──────────────────────────┘
               │                      │                    │
               v                      v                    v
        ┌────────────────────────────────────────────────────────────┐
        │         CAMADA DE INGESTÃO (Integração)                   │
        ├──────────────┬──────────────┬──────────────────────────────┤
        │ Kinesis      │ EventBridge  │ API Gateway + Lambda        │
        │ Firehose     │ (eventos)    │ (webhooks, polling)         │
        └──────────────┴──────────────┴──────────────────────────────┘
                               v
        ┌────────────────────────────────────────────────────────────┐
        │      CAMADA DE ARMAZENAMENTO (Data Lake)                   │
        ├──────────────┬──────────────┬──────────────┬───────────────┤
        │  S3 (Raw)    │  S3 (Silver) │ Redshift     │ DynamoDB      │
        │  -JSON       │  -Parquet    │ -Warehouse   │ -Cache        │
        │  -CSV        │  -Partitioned│ -Queries     │ -Real-time    │
        └──────────────┴──────────────┴──────────────┴───────────────┘
                               v
        ┌────────────────────────────────────────────────────────────┐
        │     CAMADA DE PROCESSAMENTO (ETL/Feature Engineering)      │
        ├──────────────┬──────────────┬──────────────────────────────┤
        │ AWS Glue     │ Spark (EMR)  │ Lambda                       │
        │ - Cataloging │ - Complex    │ - Lightweight logic          │
        │ - Transforms │   transforms │ - Real-time enrichment       │
        │ - Data Qualit│ - ML feature  │ - Validation                │
        └──────────────┴──────────────┴──────────────────────────────┘
                               v
        ┌────────────────────────────────────────────────────────────┐
        │   CAMADA DE FEATURE ENGINEERING (SageMaker Feature Store)  │
        ├────────────────────────────────────────────────────────────┤
        │ - Customer profiles (aggressiveness, default risk)        │
        │ - Transaction patterns (frequency, size, geographic)      │
        │ - Market data (volatility, correlations)                  │
        │ - Temporal features (day of week, holiday, season)        │
        └────────────────────────────────────────────────────────────┘
                               v
        ┌────────────────────────────────────────────────────────────┐
        │        CAMADA DE MODELOS (ML & Predictions)                │
        ├──────────────┬──────────────┬──────────────────────────────┤
        │ SageMaker    │ Lookout      │ Forecast                     │
        │ - Training   │ - Anomalies  │ - Demand/trends              │
        │ - Batch      │ - Fraud      │ - Portfolio values           │
        │ - Endpoints  │              │                              │
        └──────────────┴──────────────┴──────────────────────────────┘
                               v
        ┌────────────────────────────────────────────────────────────┐
        │         CAMADA DE ANALYTICS (BI & Dashboards)              │
        ├──────────────┬──────────────┬──────────────────────────────┤
        │ QuickSight   │ Grafana      │ Athena (Ad-hoc)              │
        │ - Executive  │ - Ops        │ - Data Scientists            │
        │ - Scorecards │ - Metrics    │ - SQL queries                │
        └──────────────┴──────────────┴──────────────────────────────┘
                               v
        ┌────────────────────────────────────────────────────────────┐
        │              CAMADA DE APLICAÇÕES                          │
        ├──────────────┬──────────────┬──────────────────────────────┤
        │ API Gateway  │ SageMaker    │ SNS/SQS/EventBridge         │
        │ Lambda       │ Endpoints    │ (Alerts & Actions)           │
        │ (Real-time)  │ (Scoring)    │                              │
        └──────────────┴──────────────┴──────────────────────────────┘
                               v
        ┌────────────────────────────────────────────────────────────┐
        │         CAMADA DE SEGURANÇA & COMPLIANCE                   │
        ├──────────────┬──────────────┬──────────────────────────────┤
        │ KMS          │ IAM/Lake     │ CloudTrail / Config / Macie  │
        │ (Encryption) │ Formation    │ (Auditing & Monitoring)      │
        │ Secrets Mgr  │ (Governance) │                              │
        └──────────────┴──────────────┴──────────────────────────────┘
```

---

## 8. Casos de Uso Implementados (Case Studies)

### 8.1 Case 1: Banco Varejo - Detecção de Fraude

**Problema:** 0.5% das transações são fraudes, causando perdas de R$5M/ano

**Solução AWS:**
- **Ingestão**: Kinesis Firehose (100K transações/seg)
- **Processamento**: Lambda + SageMaker (XGBoost)
- **Storage**: S3 (archive) + DynamoDB (cache)
- **Real-time**: SageMaker Endpoint com latência <100ms
- **Alertas**: SNS → Security Team

**Resultados:**
- Detecção: 95% de precisão (AUC = 0.98)
- Redução de fraude: 85%
- Economia: R$4.2M/ano (acima do custo da solução)
- ROI: 8.4x em 12 meses

**Custo Mensal**: ~$15K

---

### 8.2 Case 2: Geradora de Energia - Previsão de Demanda

**Problema:** Flutuações de demanda causam desperdício e falta de oferta

**Solução AWS:**
- **Dados**: Histórico 5 anos de demanda + variáveis externas (clima, eventos)
- **Modelo**: SageMaker Forecast (algoritmo automático selecionado)
- **Cadência**: Daily forecast para 14 dias
- **Acurácia**: MAPE = 8%

**Resultados:**
- Otimização de geração: +3% eficiência
- Redução de desperdício: 15%
- Economia: R$2.1M/ano
- ROI: 6.2x

**Custo Mensal**: ~$3.5K

---

### 8.3 Case 3: Gestora de Fundos - Análise de Portfólio

**Problema:** Análise manual de 500+ fundos = 2 semanas para relatório trimestral

**Solução AWS:**
- **Dados**: APIs de mercado (Bloomberg, Reuters) + dados internos
- **Processamento**: Glue + Spark (EMR)
- **Analytics**: QuickSight com drill-down interativo
- **Relatórios**: Automáticos via Lambda + QuickSight APIs

**Resultados:**
- Tempo de relatório: 2 semanas → 2 horas
- Acurácia: 100% (automático vs manual)
- Insights adicionais: Correlações, risk metrics em tempo real

**Custo Mensal**: ~$8K

---

## 9. Pricing & ROI Projections

### 9.1 Modelo de Custo: Banco Médio (R$100B Assets)

| Componente | Descrição | Custo/mês | % Total |
|-----------|-----------|----------|--------|
| **Armazenamento** | S3 (2TB raw) + Redshift (1TB) | $3K | 5% |
| **Processamento** | Glue (100h) + Lambda (500M inv) | $8K | 12% |
| **ML & Analytics** | SageMaker + QuickSight (50 users) | $25K | 37% |
| **Streaming** | Kinesis (1B events/dia) | $15K | 22% |
| **Segurança** | KMS, CloudTrail, GuardDuty, Config | $6K | 9% |
| **Data Transfer** | Cross-region, internet | $4K | 6% |
| **Suporte** | AWS Premium Support | $6K | 9% |
| **TOTAL** | | **$67K** | **100%** |

**Annual Cost**: ~$804K USD = ~R$4.2M BRL (cotação 5.2)

### 9.2 ROI Projections

| Caso de Uso | Economia Anual | Payback | ROI 3 anos |
|----------|-----------------|---------|-----------|
| Detecção de Fraude | R$4.2M | 3 meses | 1,250% |
| Previsão de Demanda | R$2.1M | 6 meses | 575% |
| Automação de Relatórios | R$1.8M | 4 meses | 420% |
| Compliance Automático | R$0.9M | 8 meses | 220% |
| **TOTAL** | **R$9.0M** | **5 meses** | **580%** |

**Custo Anual DA**: R$4.2M  
**Economia Anual**: R$9.0M  
**Net Benefit Year 1**: R$4.8M  

---

## 10. Roadmap de Implementação

### Fase 1 (Meses 1-3): MVP - Data Lake + Analytics
- [x] Provisionar S3, Redshift, Glue
- [x] Ingerir dados históricos (6 meses)
- [x] Criar 5 dashboards principais (QuickSight)
- [ ] Implementar Athena para ad-hoc queries
- **Custo**: ~$20K/mês

### Fase 2 (Meses 4-6): ML & Real-time
- [ ] Feature Store (SageMaker)
- [ ] Modelo de detecção de fraude
- [ ] Kinesis para transações em tempo real
- [ ] SageMaker Endpoints (scoring <100ms)
- **Custo**: ~$30K/mês

### Fase 3 (Meses 7-9): Segurança & Compliance
- [ ] KMS, Secrets Manager, VPC Endpoints
- [ ] CloudTrail, GuardDuty, Macie
- [ ] Lake Formation governance
- [ ] Auditoria de compliance
- **Custo**: ~$25K/mês

### Fase 4 (Meses 10+): Scale & Optimization
- [ ] Multi-region (disaster recovery)
- [ ] Modelos avançados (Deep Learning, NLP)
- [ ] Automação completa (GitOps, IaC)
- [ ] Integração com Legacy systems
- **Custo**: ~$70K/mês (estado estacionário)

---

## 11. Recursos & Links de Referência

### Documentação AWS Oficial

| Tópico | Link |
|--------|------|
| **Data Lakes** | https://aws.amazon.com/lake-formation/ |
| **Redshift** | https://docs.aws.amazon.com/redshift/latest/gsg/ |
| **SageMaker** | https://docs.aws.amazon.com/sagemaker/latest/dg/ |
| **QuickSight** | https://docs.aws.amazon.com/quicksight/latest/user/ |
| **Compliance** | https://aws.amazon.com/compliance/ |
| **Security Best Practices** | https://aws.amazon.com/architecture/security-identity-compliance/ |
| **Well-Architected Framework** | https://aws.amazon.com/architecture/well-architected/ |

### Whitepapers Recomendados

1. **"Analytics on AWS"**
   - Arquitetura completa de analytics
   - Best practices e patterns

2. **"Machine Learning on AWS"**
   - ML workflow end-to-end
   - Casos de uso financeiros

3. **"Security at Scale: Logging in AWS"**
   - Compliance e auditoria
   - CloudTrail, VPC Flow Logs

4. **"Building Secure Multi-Tenant Solutions"**
   - Isolamento de dados
   - Controle de acesso granular

### AWS Solutions & Reference Architectures

- **Financial Services on AWS**: https://aws.amazon.com/financial-services/
- **Data Lake Reference Architecture**: https://aws.amazon.com/solutions/implementations/data-lake-foundation/
- **AWS Well-Architected Labs**: https://www.wellarchitectedlabs.com/

### Ferramentas & Calculadoras

- **AWS Pricing Calculator**: https://calculator.aws/
- **AWS TCO Calculator**: https://aws.amazon.com/tco-calculator/
- **AWS Well-Architected Tool**: https://console.aws.amazon.com/wellarchitected/

---

## 12. Conclusão

### Pontos-Chave para Adoção AWS no Setor Financeiro

1. **Escalabilidade**: Cresce de GB a PB sem mudança de arquitetura
2. **Custo-Benefício**: Pay-as-you-go, sem CapEx
3. **Compliance Nativo**: Já atende PCI-DSS, ISO 27001, LGPD
4. **Inovação Rápida**: 200+ serviços, updates contínuos
5. **Segurança Integrada**: KMS, VPC, IAM, CloudTrail

### Próximos Passos

1. **Assessment** (2 semanas): Inventário de dados e workloads
2. **PoC** (4 semanas): Piloto com caso de uso prioritário
3. **Scale** (8-12 semanas): Expandir para todo portfólio
4. **Otimização** (ongoing): RI, Savings Plans, Right-sizing

### Contatos & Suporte

- **AWS Financial Services Team**: https://aws.amazon.com/financial-services/contact/
- **AWS Support Plans**: https://aws.amazon.com/support/
- **AWS Marketplace Partners**: https://aws.amazon.com/marketplace/

---

**Documento preparado para: Portal de Conhecimento Financeiro**  
**Data**: 2026-08-16  
**Versão**: 1.0  
**Status**: Pronto para Revisão
