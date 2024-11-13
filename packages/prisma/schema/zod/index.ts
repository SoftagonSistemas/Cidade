import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','apiUserId','email','name','createdAt']);

export const DocumentScalarFieldEnumSchema = z.enum(['id','title','filePath','mimeType','keywords','ocrText','ownerId','signed','signedAt','signature','createdAt']);

export const DocumentVersionScalarFieldEnumSchema = z.enum(['id','documentId','versionNumber','filePath','changesDescription','createdById','createdAt']);

export const WorkflowScalarFieldEnumSchema = z.enum(['id','name','description','status','createdAt','updatedAt']);

export const TaskScalarFieldEnumSchema = z.enum(['id','workflowId','assignedToId','documentId','title','description','status','dueDate','createdAt','updatedAt']);

export const AuditLogScalarFieldEnumSchema = z.enum(['id','taskId','action','performedById','timestamp','description']);

export const SharedDocumentScalarFieldEnumSchema = z.enum(['id','documentId','userId','sharedAt']);

export const DigitalCertificateScalarFieldEnumSchema = z.enum(['id','userId','filePath','password','createdAt']);

export const FileMetadataScalarFieldEnumSchema = z.enum(['id','documentId','fileSize','mimeType','checksum','createdAt']);

export const Back3nd_userScalarFieldEnumSchema = z.enum(['id','name','email','password','reset_token','created_at','updated_at']);

export const Back3nd_roleScalarFieldEnumSchema = z.enum(['id','name','description','created_at','updated_at']);

export const Back3nd_user_roleScalarFieldEnumSchema = z.enum(['id','user_id','role_id','created_at']);

export const Back3nd_permissionScalarFieldEnumSchema = z.enum(['id','role_id','table_id','can_create','can_read','can_update','can_delete','created_at']);

export const Back3nd_entityScalarFieldEnumSchema = z.enum(['id','name','created_at','updated_at']);

export const Back3nd_entity_fieldsScalarFieldEnumSchema = z.enum(['id','columnName','columnType','size','placeholder','defaultValue','isUnique','entity_id','created_at']);

export const Back3nd_password_resetScalarFieldEnumSchema = z.enum(['id','user_id','token','created_at','expires_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','apiUserId','email','name']);

export const DocumentOrderByRelevanceFieldEnumSchema = z.enum(['id','title','filePath','mimeType','keywords','ocrText','ownerId','signature']);

export const DocumentVersionOrderByRelevanceFieldEnumSchema = z.enum(['id','documentId','filePath','changesDescription','createdById']);

export const WorkflowOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description','status']);

export const TaskOrderByRelevanceFieldEnumSchema = z.enum(['id','workflowId','assignedToId','documentId','title','description','status']);

export const AuditLogOrderByRelevanceFieldEnumSchema = z.enum(['id','taskId','action','performedById','description']);

export const SharedDocumentOrderByRelevanceFieldEnumSchema = z.enum(['id','documentId','userId']);

export const DigitalCertificateOrderByRelevanceFieldEnumSchema = z.enum(['id','userId','filePath','password']);

export const FileMetadataOrderByRelevanceFieldEnumSchema = z.enum(['id','documentId','mimeType','checksum']);

export const back3nd_userOrderByRelevanceFieldEnumSchema = z.enum(['id','name','email','password','reset_token']);

export const back3nd_roleOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description']);

export const back3nd_user_roleOrderByRelevanceFieldEnumSchema = z.enum(['id','user_id','role_id']);

export const back3nd_permissionOrderByRelevanceFieldEnumSchema = z.enum(['id','role_id','table_id']);

export const back3nd_entityOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const back3nd_entity_fieldsOrderByRelevanceFieldEnumSchema = z.enum(['id','columnName','columnType','placeholder','defaultValue','entity_id']);

export const back3nd_password_resetOrderByRelevanceFieldEnumSchema = z.enum(['id','user_id','token']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

/**
 * The `User` model represents system users.
 * In a GED context, users can create, own, and share documents.
 * In a BPM context, users may also be assigned to tasks within workflows, allowing them to
 * participate in document-based processes (e.g., review, approval).
 */
export const UserSchema = z.object({
  id: z.string(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// DOCUMENT SCHEMA
/////////////////////////////////////////

/**
 * The `Document` model is central in a GED system, representing any file stored and managed.
 * It supports various document types through `mimeType`, enabling flexible management of file types.
 * This model can store search-related metadata (`keywords`, `ocrText`) and is linked to workflows in BPM.
 * `signed` and `signedAt` help manage document authenticity through digital signing.
 */
export const DocumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.string().array(),
  ocrText: z.string().nullable(),
  ownerId: z.string(),
  signed: z.boolean(),
  signedAt: z.coerce.date().nullable(),
  signature: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type Document = z.infer<typeof DocumentSchema>

/////////////////////////////////////////
// DOCUMENT VERSION SCHEMA
/////////////////////////////////////////

/**
 * The `DocumentVersion` model enables version control within GED.
 * It stores previous document states, supporting document tracking and restoration.
 * `versionNumber` and `changesDescription` enable an audit trail, valuable for compliance.
 * This model is linked to a user (`createdBy`) for accountability.
 */
export const DocumentVersionSchema = z.object({
  id: z.string(),
  documentId: z.string(),
  versionNumber: z.number().int(),
  filePath: z.string(),
  changesDescription: z.string().nullable(),
  createdById: z.string(),
  createdAt: z.coerce.date(),
})

export type DocumentVersion = z.infer<typeof DocumentVersionSchema>

/////////////////////////////////////////
// WORKFLOW SCHEMA
/////////////////////////////////////////

/**
 * The `Workflow` model organizes business processes for document-based tasks in BPM.
 * Workflows represent entire processes with multiple tasks (`steps`) for document approvals,
 * reviews, and other interactions. `status` allows monitoring of the workflow's current state.
 */
export const WorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Workflow = z.infer<typeof WorkflowSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

/**
 * The `Task` model defines a single step in a `Workflow`, representing an actionable item.
 * Tasks can be associated with specific documents (e.g., approval or review) and assigned to users.
 * `status` tracks task progress, and `dueDate` enforces deadlines, aiding in process management.
 */
export const TaskSchema = z.object({
  id: z.string(),
  workflowId: z.string(),
  assignedToId: z.string().nullable(),
  documentId: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// AUDIT LOG SCHEMA
/////////////////////////////////////////

/**
 * The `AuditLog` model tracks actions taken on a `Task`, supporting a detailed audit trail.
 * It records each action, who performed it, and when, enabling transparency and accountability
 * in BPM processes. This model supports compliance with regulatory requirements.
 */
export const AuditLogSchema = z.object({
  id: z.string(),
  taskId: z.string(),
  action: z.string(),
  performedById: z.string(),
  timestamp: z.coerce.date(),
  description: z.string().nullable(),
})

export type AuditLog = z.infer<typeof AuditLogSchema>

/////////////////////////////////////////
// SHARED DOCUMENT SCHEMA
/////////////////////////////////////////

/**
 * The `SharedDocument` model manages document sharing with other users in GED.
 * This model keeps track of which user has access to which documents and when sharing occurred.
 * It facilitates controlled document distribution, supporting collaboration and data security.
 */
export const SharedDocumentSchema = z.object({
  id: z.string(),
  documentId: z.string(),
  userId: z.string(),
  sharedAt: z.coerce.date(),
})

export type SharedDocument = z.infer<typeof SharedDocumentSchema>

/////////////////////////////////////////
// DIGITAL CERTIFICATE SCHEMA
/////////////////////////////////////////

/**
 * The `DigitalCertificate` model holds certificates for digital signing, crucial for document authentication.
 * Each certificate is associated with a user, ensuring they can sign documents securely.
 * This model is essential in GED to verify document integrity and author authenticity.
 */
export const DigitalCertificateSchema = z.object({
  id: z.string(),
  userId: z.string(),
  filePath: z.string(),
  password: z.string(),
  createdAt: z.coerce.date(),
})

export type DigitalCertificate = z.infer<typeof DigitalCertificateSchema>

/////////////////////////////////////////
// FILE METADATA SCHEMA
/////////////////////////////////////////

/**
 * The `FileMetadata` model stores additional information for document files,
 * including file size, MIME type, and checksum, which ensure file integrity and proper management.
 * This model is integral to the GED system, enabling efficient file storage and access controls.
 */
export const FileMetadataSchema = z.object({
  id: z.string(),
  documentId: z.string(),
  fileSize: z.number().int(),
  mimeType: z.string(),
  checksum: z.string(),
  createdAt: z.coerce.date(),
})

export type FileMetadata = z.infer<typeof FileMetadataSchema>

/////////////////////////////////////////
// BACK 3 ND USER SCHEMA
/////////////////////////////////////////

export const back3nd_userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type back3nd_user = z.infer<typeof back3nd_userSchema>

/////////////////////////////////////////
// BACK 3 ND ROLE SCHEMA
/////////////////////////////////////////

export const back3nd_roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type back3nd_role = z.infer<typeof back3nd_roleSchema>

/////////////////////////////////////////
// BACK 3 ND USER ROLE SCHEMA
/////////////////////////////////////////

export const back3nd_user_roleSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  role_id: z.string(),
  created_at: z.coerce.date(),
})

export type back3nd_user_role = z.infer<typeof back3nd_user_roleSchema>

/////////////////////////////////////////
// BACK 3 ND PERMISSION SCHEMA
/////////////////////////////////////////

export const back3nd_permissionSchema = z.object({
  id: z.string(),
  role_id: z.string(),
  table_id: z.string(),
  can_create: z.boolean(),
  can_read: z.boolean(),
  can_update: z.boolean(),
  can_delete: z.boolean(),
  created_at: z.coerce.date(),
})

export type back3nd_permission = z.infer<typeof back3nd_permissionSchema>

/////////////////////////////////////////
// BACK 3 ND ENTITY SCHEMA
/////////////////////////////////////////

export const back3nd_entitySchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type back3nd_entity = z.infer<typeof back3nd_entitySchema>

/////////////////////////////////////////
// BACK 3 ND ENTITY FIELDS SCHEMA
/////////////////////////////////////////

export const back3nd_entity_fieldsSchema = z.object({
  id: z.string(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().nullable(),
  placeholder: z.string().nullable(),
  defaultValue: z.string().nullable(),
  isUnique: z.boolean(),
  entity_id: z.string(),
  created_at: z.coerce.date(),
})

export type back3nd_entity_fields = z.infer<typeof back3nd_entity_fieldsSchema>

/////////////////////////////////////////
// BACK 3 ND PASSWORD RESET SCHEMA
/////////////////////////////////////////

export const back3nd_password_resetSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date(),
  expires_at: z.coerce.date(),
})

export type back3nd_password_reset = z.infer<typeof back3nd_password_resetSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  documents: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  sharedDocuments: z.union([z.boolean(),z.lazy(() => SharedDocumentFindManyArgsSchema)]).optional(),
  certificates: z.union([z.boolean(),z.lazy(() => DigitalCertificateFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  createdVersions: z.union([z.boolean(),z.lazy(() => DocumentVersionFindManyArgsSchema)]).optional(),
  auditLogs: z.union([z.boolean(),z.lazy(() => AuditLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  documents: z.boolean().optional(),
  sharedDocuments: z.boolean().optional(),
  certificates: z.boolean().optional(),
  tasks: z.boolean().optional(),
  createdVersions: z.boolean().optional(),
  auditLogs: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  apiUserId: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  documents: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  sharedDocuments: z.union([z.boolean(),z.lazy(() => SharedDocumentFindManyArgsSchema)]).optional(),
  certificates: z.union([z.boolean(),z.lazy(() => DigitalCertificateFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  createdVersions: z.union([z.boolean(),z.lazy(() => DocumentVersionFindManyArgsSchema)]).optional(),
  auditLogs: z.union([z.boolean(),z.lazy(() => AuditLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DOCUMENT
//------------------------------------------------------

export const DocumentIncludeSchema: z.ZodType<Prisma.DocumentInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  sharedWith: z.union([z.boolean(),z.lazy(() => SharedDocumentFindManyArgsSchema)]).optional(),
  versions: z.union([z.boolean(),z.lazy(() => DocumentVersionFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  fileMetadata: z.union([z.boolean(),z.lazy(() => FileMetadataArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DocumentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DocumentArgsSchema: z.ZodType<Prisma.DocumentDefaultArgs> = z.object({
  select: z.lazy(() => DocumentSelectSchema).optional(),
  include: z.lazy(() => DocumentIncludeSchema).optional(),
}).strict();

export const DocumentCountOutputTypeArgsSchema: z.ZodType<Prisma.DocumentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DocumentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DocumentCountOutputTypeSelectSchema: z.ZodType<Prisma.DocumentCountOutputTypeSelect> = z.object({
  sharedWith: z.boolean().optional(),
  versions: z.boolean().optional(),
  tasks: z.boolean().optional(),
}).strict();

export const DocumentSelectSchema: z.ZodType<Prisma.DocumentSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  filePath: z.boolean().optional(),
  mimeType: z.boolean().optional(),
  keywords: z.boolean().optional(),
  ocrText: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  signed: z.boolean().optional(),
  signedAt: z.boolean().optional(),
  signature: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  sharedWith: z.union([z.boolean(),z.lazy(() => SharedDocumentFindManyArgsSchema)]).optional(),
  versions: z.union([z.boolean(),z.lazy(() => DocumentVersionFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  fileMetadata: z.union([z.boolean(),z.lazy(() => FileMetadataArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DocumentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DOCUMENT VERSION
//------------------------------------------------------

export const DocumentVersionIncludeSchema: z.ZodType<Prisma.DocumentVersionInclude> = z.object({
  document: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const DocumentVersionArgsSchema: z.ZodType<Prisma.DocumentVersionDefaultArgs> = z.object({
  select: z.lazy(() => DocumentVersionSelectSchema).optional(),
  include: z.lazy(() => DocumentVersionIncludeSchema).optional(),
}).strict();

export const DocumentVersionSelectSchema: z.ZodType<Prisma.DocumentVersionSelect> = z.object({
  id: z.boolean().optional(),
  documentId: z.boolean().optional(),
  versionNumber: z.boolean().optional(),
  filePath: z.boolean().optional(),
  changesDescription: z.boolean().optional(),
  createdById: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  document: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// WORKFLOW
//------------------------------------------------------

export const WorkflowIncludeSchema: z.ZodType<Prisma.WorkflowInclude> = z.object({
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkflowCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const WorkflowArgsSchema: z.ZodType<Prisma.WorkflowDefaultArgs> = z.object({
  select: z.lazy(() => WorkflowSelectSchema).optional(),
  include: z.lazy(() => WorkflowIncludeSchema).optional(),
}).strict();

export const WorkflowCountOutputTypeArgsSchema: z.ZodType<Prisma.WorkflowCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WorkflowCountOutputTypeSelectSchema).nullish(),
}).strict();

export const WorkflowCountOutputTypeSelectSchema: z.ZodType<Prisma.WorkflowCountOutputTypeSelect> = z.object({
  tasks: z.boolean().optional(),
}).strict();

export const WorkflowSelectSchema: z.ZodType<Prisma.WorkflowSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkflowCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TASK
//------------------------------------------------------

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
  workflow: z.union([z.boolean(),z.lazy(() => WorkflowArgsSchema)]).optional(),
  assignedTo: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  document: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
  auditLogs: z.union([z.boolean(),z.lazy(() => AuditLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export const TaskCountOutputTypeArgsSchema: z.ZodType<Prisma.TaskCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TaskCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TaskCountOutputTypeSelectSchema: z.ZodType<Prisma.TaskCountOutputTypeSelect> = z.object({
  auditLogs: z.boolean().optional(),
}).strict();

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  workflowId: z.boolean().optional(),
  assignedToId: z.boolean().optional(),
  documentId: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  dueDate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  workflow: z.union([z.boolean(),z.lazy(() => WorkflowArgsSchema)]).optional(),
  assignedTo: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  document: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
  auditLogs: z.union([z.boolean(),z.lazy(() => AuditLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

// AUDIT LOG
//------------------------------------------------------

export const AuditLogIncludeSchema: z.ZodType<Prisma.AuditLogInclude> = z.object({
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  performedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AuditLogArgsSchema: z.ZodType<Prisma.AuditLogDefaultArgs> = z.object({
  select: z.lazy(() => AuditLogSelectSchema).optional(),
  include: z.lazy(() => AuditLogIncludeSchema).optional(),
}).strict();

export const AuditLogSelectSchema: z.ZodType<Prisma.AuditLogSelect> = z.object({
  id: z.boolean().optional(),
  taskId: z.boolean().optional(),
  action: z.boolean().optional(),
  performedById: z.boolean().optional(),
  timestamp: z.boolean().optional(),
  description: z.boolean().optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  performedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SHARED DOCUMENT
//------------------------------------------------------

export const SharedDocumentIncludeSchema: z.ZodType<Prisma.SharedDocumentInclude> = z.object({
  document: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
  sharedWith: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SharedDocumentArgsSchema: z.ZodType<Prisma.SharedDocumentDefaultArgs> = z.object({
  select: z.lazy(() => SharedDocumentSelectSchema).optional(),
  include: z.lazy(() => SharedDocumentIncludeSchema).optional(),
}).strict();

export const SharedDocumentSelectSchema: z.ZodType<Prisma.SharedDocumentSelect> = z.object({
  id: z.boolean().optional(),
  documentId: z.boolean().optional(),
  userId: z.boolean().optional(),
  sharedAt: z.boolean().optional(),
  document: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
  sharedWith: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// DIGITAL CERTIFICATE
//------------------------------------------------------

export const DigitalCertificateIncludeSchema: z.ZodType<Prisma.DigitalCertificateInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const DigitalCertificateArgsSchema: z.ZodType<Prisma.DigitalCertificateDefaultArgs> = z.object({
  select: z.lazy(() => DigitalCertificateSelectSchema).optional(),
  include: z.lazy(() => DigitalCertificateIncludeSchema).optional(),
}).strict();

export const DigitalCertificateSelectSchema: z.ZodType<Prisma.DigitalCertificateSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  filePath: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// FILE METADATA
//------------------------------------------------------

export const FileMetadataIncludeSchema: z.ZodType<Prisma.FileMetadataInclude> = z.object({
  document: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
}).strict()

export const FileMetadataArgsSchema: z.ZodType<Prisma.FileMetadataDefaultArgs> = z.object({
  select: z.lazy(() => FileMetadataSelectSchema).optional(),
  include: z.lazy(() => FileMetadataIncludeSchema).optional(),
}).strict();

export const FileMetadataSelectSchema: z.ZodType<Prisma.FileMetadataSelect> = z.object({
  id: z.boolean().optional(),
  documentId: z.boolean().optional(),
  fileSize: z.boolean().optional(),
  mimeType: z.boolean().optional(),
  checksum: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  document: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
}).strict()

// BACK 3 ND USER
//------------------------------------------------------

export const back3nd_userIncludeSchema: z.ZodType<Prisma.back3nd_userInclude> = z.object({
  back3nd_password_reset: z.union([z.boolean(),z.lazy(() => back3nd_password_resetFindManyArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => back3nd_user_roleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_userCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const back3nd_userArgsSchema: z.ZodType<Prisma.back3nd_userDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_userSelectSchema).optional(),
  include: z.lazy(() => back3nd_userIncludeSchema).optional(),
}).strict();

export const back3nd_userCountOutputTypeArgsSchema: z.ZodType<Prisma.back3nd_userCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_userCountOutputTypeSelectSchema).nullish(),
}).strict();

export const back3nd_userCountOutputTypeSelectSchema: z.ZodType<Prisma.back3nd_userCountOutputTypeSelect> = z.object({
  back3nd_password_reset: z.boolean().optional(),
  roles: z.boolean().optional(),
}).strict();

export const back3nd_userSelectSchema: z.ZodType<Prisma.back3nd_userSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  reset_token: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  back3nd_password_reset: z.union([z.boolean(),z.lazy(() => back3nd_password_resetFindManyArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => back3nd_user_roleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_userCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BACK 3 ND ROLE
//------------------------------------------------------

export const back3nd_roleIncludeSchema: z.ZodType<Prisma.back3nd_roleInclude> = z.object({
  permissions: z.union([z.boolean(),z.lazy(() => back3nd_permissionFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => back3nd_user_roleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_roleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const back3nd_roleArgsSchema: z.ZodType<Prisma.back3nd_roleDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_roleSelectSchema).optional(),
  include: z.lazy(() => back3nd_roleIncludeSchema).optional(),
}).strict();

export const back3nd_roleCountOutputTypeArgsSchema: z.ZodType<Prisma.back3nd_roleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_roleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const back3nd_roleCountOutputTypeSelectSchema: z.ZodType<Prisma.back3nd_roleCountOutputTypeSelect> = z.object({
  permissions: z.boolean().optional(),
  users: z.boolean().optional(),
}).strict();

export const back3nd_roleSelectSchema: z.ZodType<Prisma.back3nd_roleSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  permissions: z.union([z.boolean(),z.lazy(() => back3nd_permissionFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => back3nd_user_roleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_roleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BACK 3 ND USER ROLE
//------------------------------------------------------

export const back3nd_user_roleIncludeSchema: z.ZodType<Prisma.back3nd_user_roleInclude> = z.object({
  role: z.union([z.boolean(),z.lazy(() => back3nd_roleArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => back3nd_userArgsSchema)]).optional(),
}).strict()

export const back3nd_user_roleArgsSchema: z.ZodType<Prisma.back3nd_user_roleDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_user_roleSelectSchema).optional(),
  include: z.lazy(() => back3nd_user_roleIncludeSchema).optional(),
}).strict();

export const back3nd_user_roleSelectSchema: z.ZodType<Prisma.back3nd_user_roleSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  role_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  role: z.union([z.boolean(),z.lazy(() => back3nd_roleArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => back3nd_userArgsSchema)]).optional(),
}).strict()

// BACK 3 ND PERMISSION
//------------------------------------------------------

export const back3nd_permissionIncludeSchema: z.ZodType<Prisma.back3nd_permissionInclude> = z.object({
  role: z.union([z.boolean(),z.lazy(() => back3nd_roleArgsSchema)]).optional(),
  table: z.union([z.boolean(),z.lazy(() => back3nd_entityArgsSchema)]).optional(),
}).strict()

export const back3nd_permissionArgsSchema: z.ZodType<Prisma.back3nd_permissionDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_permissionSelectSchema).optional(),
  include: z.lazy(() => back3nd_permissionIncludeSchema).optional(),
}).strict();

export const back3nd_permissionSelectSchema: z.ZodType<Prisma.back3nd_permissionSelect> = z.object({
  id: z.boolean().optional(),
  role_id: z.boolean().optional(),
  table_id: z.boolean().optional(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.boolean().optional(),
  role: z.union([z.boolean(),z.lazy(() => back3nd_roleArgsSchema)]).optional(),
  table: z.union([z.boolean(),z.lazy(() => back3nd_entityArgsSchema)]).optional(),
}).strict()

// BACK 3 ND ENTITY
//------------------------------------------------------

export const back3nd_entityIncludeSchema: z.ZodType<Prisma.back3nd_entityInclude> = z.object({
  back3nd_entity_fields: z.union([z.boolean(),z.lazy(() => back3nd_entity_fieldsFindManyArgsSchema)]).optional(),
  back3nd_permission: z.union([z.boolean(),z.lazy(() => back3nd_permissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_entityCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const back3nd_entityArgsSchema: z.ZodType<Prisma.back3nd_entityDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_entitySelectSchema).optional(),
  include: z.lazy(() => back3nd_entityIncludeSchema).optional(),
}).strict();

export const back3nd_entityCountOutputTypeArgsSchema: z.ZodType<Prisma.back3nd_entityCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_entityCountOutputTypeSelectSchema).nullish(),
}).strict();

export const back3nd_entityCountOutputTypeSelectSchema: z.ZodType<Prisma.back3nd_entityCountOutputTypeSelect> = z.object({
  back3nd_entity_fields: z.boolean().optional(),
  back3nd_permission: z.boolean().optional(),
}).strict();

export const back3nd_entitySelectSchema: z.ZodType<Prisma.back3nd_entitySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  back3nd_entity_fields: z.union([z.boolean(),z.lazy(() => back3nd_entity_fieldsFindManyArgsSchema)]).optional(),
  back3nd_permission: z.union([z.boolean(),z.lazy(() => back3nd_permissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_entityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BACK 3 ND ENTITY FIELDS
//------------------------------------------------------

export const back3nd_entity_fieldsIncludeSchema: z.ZodType<Prisma.back3nd_entity_fieldsInclude> = z.object({
  back3nd_entity: z.union([z.boolean(),z.lazy(() => back3nd_entityArgsSchema)]).optional(),
}).strict()

export const back3nd_entity_fieldsArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_entity_fieldsSelectSchema).optional(),
  include: z.lazy(() => back3nd_entity_fieldsIncludeSchema).optional(),
}).strict();

export const back3nd_entity_fieldsSelectSchema: z.ZodType<Prisma.back3nd_entity_fieldsSelect> = z.object({
  id: z.boolean().optional(),
  columnName: z.boolean().optional(),
  columnType: z.boolean().optional(),
  size: z.boolean().optional(),
  placeholder: z.boolean().optional(),
  defaultValue: z.boolean().optional(),
  isUnique: z.boolean().optional(),
  entity_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  back3nd_entity: z.union([z.boolean(),z.lazy(() => back3nd_entityArgsSchema)]).optional(),
}).strict()

// BACK 3 ND PASSWORD RESET
//------------------------------------------------------

export const back3nd_password_resetIncludeSchema: z.ZodType<Prisma.back3nd_password_resetInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => back3nd_userArgsSchema)]).optional(),
}).strict()

export const back3nd_password_resetArgsSchema: z.ZodType<Prisma.back3nd_password_resetDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_password_resetSelectSchema).optional(),
  include: z.lazy(() => back3nd_password_resetIncludeSchema).optional(),
}).strict();

export const back3nd_password_resetSelectSchema: z.ZodType<Prisma.back3nd_password_resetSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  token: z.boolean().optional(),
  created_at: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => back3nd_userArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  apiUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentListRelationFilterSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionListRelationFilterSchema).optional(),
  auditLogs: z.lazy(() => AuditLogListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  apiUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  documents: z.lazy(() => DocumentOrderByRelationAggregateInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentOrderByRelationAggregateInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateOrderByRelationAggregateInputSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionOrderByRelationAggregateInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => UserOrderByRelevanceInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    apiUserId: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
    apiUserId: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    apiUserId: z.string(),
    email: z.string(),
  }),
  z.object({
    apiUserId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  apiUserId: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentListRelationFilterSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionListRelationFilterSchema).optional(),
  auditLogs: z.lazy(() => AuditLogListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  apiUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  apiUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DocumentWhereInputSchema: z.ZodType<Prisma.DocumentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentWhereInputSchema),z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentWhereInputSchema),z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  filePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  keywords: z.lazy(() => StringNullableListFilterSchema).optional(),
  ocrText: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  signed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  signedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  signature: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  sharedWith: z.lazy(() => SharedDocumentListRelationFilterSchema).optional(),
  versions: z.lazy(() => DocumentVersionListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  fileMetadata: z.union([ z.lazy(() => FileMetadataNullableRelationFilterSchema),z.lazy(() => FileMetadataWhereInputSchema) ]).optional().nullable(),
}).strict();

export const DocumentOrderByWithRelationInputSchema: z.ZodType<Prisma.DocumentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  keywords: z.lazy(() => SortOrderSchema).optional(),
  ocrText: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  signed: z.lazy(() => SortOrderSchema).optional(),
  signedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  signature: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  sharedWith: z.lazy(() => SharedDocumentOrderByRelationAggregateInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionOrderByRelationAggregateInputSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => DocumentOrderByRelevanceInputSchema).optional()
}).strict();

export const DocumentWhereUniqueInputSchema: z.ZodType<Prisma.DocumentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => DocumentWhereInputSchema),z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentWhereInputSchema),z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  filePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  keywords: z.lazy(() => StringNullableListFilterSchema).optional(),
  ocrText: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  signed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  signedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  signature: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  sharedWith: z.lazy(() => SharedDocumentListRelationFilterSchema).optional(),
  versions: z.lazy(() => DocumentVersionListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  fileMetadata: z.union([ z.lazy(() => FileMetadataNullableRelationFilterSchema),z.lazy(() => FileMetadataWhereInputSchema) ]).optional().nullable(),
}).strict());

export const DocumentOrderByWithAggregationInputSchema: z.ZodType<Prisma.DocumentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  keywords: z.lazy(() => SortOrderSchema).optional(),
  ocrText: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  signed: z.lazy(() => SortOrderSchema).optional(),
  signedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  signature: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DocumentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DocumentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DocumentMinOrderByAggregateInputSchema).optional()
}).strict();

export const DocumentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DocumentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema),z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema),z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  filePath: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  keywords: z.lazy(() => StringNullableListFilterSchema).optional(),
  ocrText: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  signed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  signedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  signature: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DocumentVersionWhereInputSchema: z.ZodType<Prisma.DocumentVersionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentVersionWhereInputSchema),z.lazy(() => DocumentVersionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentVersionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentVersionWhereInputSchema),z.lazy(() => DocumentVersionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  documentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  versionNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  filePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  changesDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdById: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  document: z.union([ z.lazy(() => DocumentRelationFilterSchema),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
  createdBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const DocumentVersionOrderByWithRelationInputSchema: z.ZodType<Prisma.DocumentVersionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  versionNumber: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  changesDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  document: z.lazy(() => DocumentOrderByWithRelationInputSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => DocumentVersionOrderByRelevanceInputSchema).optional()
}).strict();

export const DocumentVersionWhereUniqueInputSchema: z.ZodType<Prisma.DocumentVersionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => DocumentVersionWhereInputSchema),z.lazy(() => DocumentVersionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentVersionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentVersionWhereInputSchema),z.lazy(() => DocumentVersionWhereInputSchema).array() ]).optional(),
  documentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  versionNumber: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  filePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  changesDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdById: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  document: z.union([ z.lazy(() => DocumentRelationFilterSchema),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
  createdBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const DocumentVersionOrderByWithAggregationInputSchema: z.ZodType<Prisma.DocumentVersionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  versionNumber: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  changesDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DocumentVersionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DocumentVersionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DocumentVersionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DocumentVersionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DocumentVersionSumOrderByAggregateInputSchema).optional()
}).strict();

export const DocumentVersionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DocumentVersionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentVersionScalarWhereWithAggregatesInputSchema),z.lazy(() => DocumentVersionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentVersionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentVersionScalarWhereWithAggregatesInputSchema),z.lazy(() => DocumentVersionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  documentId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  versionNumber: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  filePath: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  changesDescription: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdById: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const WorkflowWhereInputSchema: z.ZodType<Prisma.WorkflowWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkflowWhereInputSchema),z.lazy(() => WorkflowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkflowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkflowWhereInputSchema),z.lazy(() => WorkflowWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict();

export const WorkflowOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkflowOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => WorkflowOrderByRelevanceInputSchema).optional()
}).strict();

export const WorkflowWhereUniqueInputSchema: z.ZodType<Prisma.WorkflowWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => WorkflowWhereInputSchema),z.lazy(() => WorkflowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkflowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkflowWhereInputSchema),z.lazy(() => WorkflowWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict());

export const WorkflowOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkflowOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkflowCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkflowMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkflowMinOrderByAggregateInputSchema).optional()
}).strict();

export const WorkflowScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkflowScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkflowScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkflowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkflowScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkflowScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkflowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TaskWhereInputSchema: z.ZodType<Prisma.TaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  workflowId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  assignedToId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  documentId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  workflow: z.union([ z.lazy(() => WorkflowRelationFilterSchema),z.lazy(() => WorkflowWhereInputSchema) ]).optional(),
  assignedTo: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  document: z.union([ z.lazy(() => DocumentNullableRelationFilterSchema),z.lazy(() => DocumentWhereInputSchema) ]).optional().nullable(),
  auditLogs: z.lazy(() => AuditLogListRelationFilterSchema).optional()
}).strict();

export const TaskOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workflowId: z.lazy(() => SortOrderSchema).optional(),
  assignedToId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  documentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  workflow: z.lazy(() => WorkflowOrderByWithRelationInputSchema).optional(),
  assignedTo: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  document: z.lazy(() => DocumentOrderByWithRelationInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => TaskOrderByRelevanceInputSchema).optional()
}).strict();

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  workflowId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  assignedToId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  documentId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  workflow: z.union([ z.lazy(() => WorkflowRelationFilterSchema),z.lazy(() => WorkflowWhereInputSchema) ]).optional(),
  assignedTo: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  document: z.union([ z.lazy(() => DocumentNullableRelationFilterSchema),z.lazy(() => DocumentWhereInputSchema) ]).optional().nullable(),
  auditLogs: z.lazy(() => AuditLogListRelationFilterSchema).optional()
}).strict());

export const TaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workflowId: z.lazy(() => SortOrderSchema).optional(),
  assignedToId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  documentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskMinOrderByAggregateInputSchema).optional()
}).strict();

export const TaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  workflowId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  assignedToId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  documentId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AuditLogWhereInputSchema: z.ZodType<Prisma.AuditLogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuditLogWhereInputSchema),z.lazy(() => AuditLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogWhereInputSchema),z.lazy(() => AuditLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  performedById: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  performedBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AuditLogOrderByWithRelationInputSchema: z.ZodType<Prisma.AuditLogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  performedById: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  task: z.lazy(() => TaskOrderByWithRelationInputSchema).optional(),
  performedBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => AuditLogOrderByRelevanceInputSchema).optional()
}).strict();

export const AuditLogWhereUniqueInputSchema: z.ZodType<Prisma.AuditLogWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AuditLogWhereInputSchema),z.lazy(() => AuditLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogWhereInputSchema),z.lazy(() => AuditLogWhereInputSchema).array() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  performedById: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  performedBy: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AuditLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuditLogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  performedById: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AuditLogCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AuditLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AuditLogMinOrderByAggregateInputSchema).optional()
}).strict();

export const AuditLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuditLogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AuditLogScalarWhereWithAggregatesInputSchema),z.lazy(() => AuditLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogScalarWhereWithAggregatesInputSchema),z.lazy(() => AuditLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  performedById: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SharedDocumentWhereInputSchema: z.ZodType<Prisma.SharedDocumentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SharedDocumentWhereInputSchema),z.lazy(() => SharedDocumentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SharedDocumentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SharedDocumentWhereInputSchema),z.lazy(() => SharedDocumentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  documentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  sharedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  document: z.union([ z.lazy(() => DocumentRelationFilterSchema),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
  sharedWith: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SharedDocumentOrderByWithRelationInputSchema: z.ZodType<Prisma.SharedDocumentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  sharedAt: z.lazy(() => SortOrderSchema).optional(),
  document: z.lazy(() => DocumentOrderByWithRelationInputSchema).optional(),
  sharedWith: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => SharedDocumentOrderByRelevanceInputSchema).optional()
}).strict();

export const SharedDocumentWhereUniqueInputSchema: z.ZodType<Prisma.SharedDocumentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SharedDocumentWhereInputSchema),z.lazy(() => SharedDocumentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SharedDocumentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SharedDocumentWhereInputSchema),z.lazy(() => SharedDocumentWhereInputSchema).array() ]).optional(),
  documentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  sharedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  document: z.union([ z.lazy(() => DocumentRelationFilterSchema),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
  sharedWith: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SharedDocumentOrderByWithAggregationInputSchema: z.ZodType<Prisma.SharedDocumentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  sharedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SharedDocumentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SharedDocumentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SharedDocumentMinOrderByAggregateInputSchema).optional()
}).strict();

export const SharedDocumentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SharedDocumentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SharedDocumentScalarWhereWithAggregatesInputSchema),z.lazy(() => SharedDocumentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SharedDocumentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SharedDocumentScalarWhereWithAggregatesInputSchema),z.lazy(() => SharedDocumentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  documentId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  sharedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DigitalCertificateWhereInputSchema: z.ZodType<Prisma.DigitalCertificateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DigitalCertificateWhereInputSchema),z.lazy(() => DigitalCertificateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DigitalCertificateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DigitalCertificateWhereInputSchema),z.lazy(() => DigitalCertificateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  filePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const DigitalCertificateOrderByWithRelationInputSchema: z.ZodType<Prisma.DigitalCertificateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => DigitalCertificateOrderByRelevanceInputSchema).optional()
}).strict();

export const DigitalCertificateWhereUniqueInputSchema: z.ZodType<Prisma.DigitalCertificateWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => DigitalCertificateWhereInputSchema),z.lazy(() => DigitalCertificateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DigitalCertificateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DigitalCertificateWhereInputSchema),z.lazy(() => DigitalCertificateWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  filePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const DigitalCertificateOrderByWithAggregationInputSchema: z.ZodType<Prisma.DigitalCertificateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DigitalCertificateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DigitalCertificateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DigitalCertificateMinOrderByAggregateInputSchema).optional()
}).strict();

export const DigitalCertificateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DigitalCertificateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DigitalCertificateScalarWhereWithAggregatesInputSchema),z.lazy(() => DigitalCertificateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DigitalCertificateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DigitalCertificateScalarWhereWithAggregatesInputSchema),z.lazy(() => DigitalCertificateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  filePath: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FileMetadataWhereInputSchema: z.ZodType<Prisma.FileMetadataWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FileMetadataWhereInputSchema),z.lazy(() => FileMetadataWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileMetadataWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileMetadataWhereInputSchema),z.lazy(() => FileMetadataWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  documentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  fileSize: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  checksum: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  document: z.union([ z.lazy(() => DocumentRelationFilterSchema),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
}).strict();

export const FileMetadataOrderByWithRelationInputSchema: z.ZodType<Prisma.FileMetadataOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  fileSize: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  checksum: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  document: z.lazy(() => DocumentOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => FileMetadataOrderByRelevanceInputSchema).optional()
}).strict();

export const FileMetadataWhereUniqueInputSchema: z.ZodType<Prisma.FileMetadataWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    documentId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    documentId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  documentId: z.string().optional(),
  AND: z.union([ z.lazy(() => FileMetadataWhereInputSchema),z.lazy(() => FileMetadataWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileMetadataWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileMetadataWhereInputSchema),z.lazy(() => FileMetadataWhereInputSchema).array() ]).optional(),
  fileSize: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  checksum: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  document: z.union([ z.lazy(() => DocumentRelationFilterSchema),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
}).strict());

export const FileMetadataOrderByWithAggregationInputSchema: z.ZodType<Prisma.FileMetadataOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  fileSize: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  checksum: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FileMetadataCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FileMetadataAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FileMetadataMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FileMetadataMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FileMetadataSumOrderByAggregateInputSchema).optional()
}).strict();

export const FileMetadataScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FileMetadataScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FileMetadataScalarWhereWithAggregatesInputSchema),z.lazy(() => FileMetadataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileMetadataScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileMetadataScalarWhereWithAggregatesInputSchema),z.lazy(() => FileMetadataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  documentId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  fileSize: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  checksum: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_userWhereInputSchema: z.ZodType<Prisma.back3nd_userWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_userWhereInputSchema),z.lazy(() => back3nd_userWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_userWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_userWhereInputSchema),z.lazy(() => back3nd_userWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reset_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_password_reset: z.lazy(() => Back3nd_password_resetListRelationFilterSchema).optional(),
  roles: z.lazy(() => Back3nd_user_roleListRelationFilterSchema).optional()
}).strict();

export const back3nd_userOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_userOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reset_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetOrderByRelationAggregateInputSchema).optional(),
  roles: z.lazy(() => back3nd_user_roleOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_userOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_userWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_userWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => back3nd_userWhereInputSchema),z.lazy(() => back3nd_userWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_userWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_userWhereInputSchema),z.lazy(() => back3nd_userWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reset_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_password_reset: z.lazy(() => Back3nd_password_resetListRelationFilterSchema).optional(),
  roles: z.lazy(() => Back3nd_user_roleListRelationFilterSchema).optional()
}).strict());

export const back3nd_userOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_userOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reset_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_userCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_userMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_userMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_userScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_userScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_userScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_userScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_userScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_userScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_userScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reset_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_roleWhereInputSchema: z.ZodType<Prisma.back3nd_roleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_roleWhereInputSchema),z.lazy(() => back3nd_roleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_roleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_roleWhereInputSchema),z.lazy(() => back3nd_roleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permissions: z.lazy(() => Back3nd_permissionListRelationFilterSchema).optional(),
  users: z.lazy(() => Back3nd_user_roleListRelationFilterSchema).optional()
}).strict();

export const back3nd_roleOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_roleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  permissions: z.lazy(() => back3nd_permissionOrderByRelationAggregateInputSchema).optional(),
  users: z.lazy(() => back3nd_user_roleOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_roleOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_roleWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_roleWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => back3nd_roleWhereInputSchema),z.lazy(() => back3nd_roleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_roleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_roleWhereInputSchema),z.lazy(() => back3nd_roleWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permissions: z.lazy(() => Back3nd_permissionListRelationFilterSchema).optional(),
  users: z.lazy(() => Back3nd_user_roleListRelationFilterSchema).optional()
}).strict());

export const back3nd_roleOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_roleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_roleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_roleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_roleMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_roleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_roleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_roleScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_roleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_roleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_roleScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_roleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_user_roleWhereInputSchema: z.ZodType<Prisma.back3nd_user_roleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_user_roleWhereInputSchema),z.lazy(() => back3nd_user_roleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_user_roleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_user_roleWhereInputSchema),z.lazy(() => back3nd_user_roleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => Back3nd_roleRelationFilterSchema),z.lazy(() => back3nd_roleWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => Back3nd_userRelationFilterSchema),z.lazy(() => back3nd_userWhereInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_user_roleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => back3nd_roleOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => back3nd_userOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_user_roleOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_user_roleWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_user_roleWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    user_id_role_id: z.lazy(() => back3nd_user_roleUser_idRole_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    user_id_role_id: z.lazy(() => back3nd_user_roleUser_idRole_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  user_id_role_id: z.lazy(() => back3nd_user_roleUser_idRole_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => back3nd_user_roleWhereInputSchema),z.lazy(() => back3nd_user_roleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_user_roleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_user_roleWhereInputSchema),z.lazy(() => back3nd_user_roleWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => Back3nd_roleRelationFilterSchema),z.lazy(() => back3nd_roleWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => Back3nd_userRelationFilterSchema),z.lazy(() => back3nd_userWhereInputSchema) ]).optional(),
}).strict());

export const back3nd_user_roleOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_user_roleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_user_roleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_user_roleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_user_roleMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_user_roleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_user_roleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_user_roleScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_user_roleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_user_roleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_user_roleScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_user_roleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_permissionWhereInputSchema: z.ZodType<Prisma.back3nd_permissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_permissionWhereInputSchema),z.lazy(() => back3nd_permissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_permissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_permissionWhereInputSchema),z.lazy(() => back3nd_permissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  can_create: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => Back3nd_roleRelationFilterSchema),z.lazy(() => back3nd_roleWhereInputSchema) ]).optional(),
  table: z.union([ z.lazy(() => Back3nd_entityRelationFilterSchema),z.lazy(() => back3nd_entityWhereInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_permissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => back3nd_roleOrderByWithRelationInputSchema).optional(),
  table: z.lazy(() => back3nd_entityOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_permissionOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_permissionWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_permissionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    role_id_table_id: z.lazy(() => back3nd_permissionRole_idTable_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    role_id_table_id: z.lazy(() => back3nd_permissionRole_idTable_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  role_id_table_id: z.lazy(() => back3nd_permissionRole_idTable_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => back3nd_permissionWhereInputSchema),z.lazy(() => back3nd_permissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_permissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_permissionWhereInputSchema),z.lazy(() => back3nd_permissionWhereInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  can_create: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => Back3nd_roleRelationFilterSchema),z.lazy(() => back3nd_roleWhereInputSchema) ]).optional(),
  table: z.union([ z.lazy(() => Back3nd_entityRelationFilterSchema),z.lazy(() => back3nd_entityWhereInputSchema) ]).optional(),
}).strict());

export const back3nd_permissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_permissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_permissionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_permissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_permissionMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_permissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_permissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_permissionScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_permissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_permissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_permissionScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_permissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  can_create: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_entityWhereInputSchema: z.ZodType<Prisma.back3nd_entityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_entityWhereInputSchema),z.lazy(() => back3nd_entityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entityWhereInputSchema),z.lazy(() => back3nd_entityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_entity_fields: z.lazy(() => Back3nd_entity_fieldsListRelationFilterSchema).optional(),
  back3nd_permission: z.lazy(() => Back3nd_permissionListRelationFilterSchema).optional()
}).strict();

export const back3nd_entityOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_entityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsOrderByRelationAggregateInputSchema).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_entityOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_entityWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_entityWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => back3nd_entityWhereInputSchema),z.lazy(() => back3nd_entityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entityWhereInputSchema),z.lazy(() => back3nd_entityWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_entity_fields: z.lazy(() => Back3nd_entity_fieldsListRelationFilterSchema).optional(),
  back3nd_permission: z.lazy(() => Back3nd_permissionListRelationFilterSchema).optional()
}).strict());

export const back3nd_entityOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_entityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_entityCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_entityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_entityMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_entityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_entityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_entityScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_entityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entityScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_entityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_entity_fieldsWhereInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_entity_fieldsWhereInputSchema),z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entity_fieldsWhereInputSchema),z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  columnName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  columnType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  placeholder: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  defaultValue: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isUnique: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  entity_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_entity: z.union([ z.lazy(() => Back3nd_entityRelationFilterSchema),z.lazy(() => back3nd_entityWhereInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnName: z.lazy(() => SortOrderSchema).optional(),
  columnType: z.lazy(() => SortOrderSchema).optional(),
  size: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  placeholder: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  defaultValue: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isUnique: z.lazy(() => SortOrderSchema).optional(),
  entity_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  back3nd_entity: z.lazy(() => back3nd_entityOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_entity_fieldsOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_entity_fieldsWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    entity_id_columnName: z.lazy(() => back3nd_entity_fieldsEntity_idColumnNameCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    entity_id_columnName: z.lazy(() => back3nd_entity_fieldsEntity_idColumnNameCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  entity_id_columnName: z.lazy(() => back3nd_entity_fieldsEntity_idColumnNameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => back3nd_entity_fieldsWhereInputSchema),z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entity_fieldsWhereInputSchema),z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array() ]).optional(),
  columnName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  columnType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  placeholder: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  defaultValue: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isUnique: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  entity_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_entity: z.union([ z.lazy(() => Back3nd_entityRelationFilterSchema),z.lazy(() => back3nd_entityWhereInputSchema) ]).optional(),
}).strict());

export const back3nd_entity_fieldsOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnName: z.lazy(() => SortOrderSchema).optional(),
  columnType: z.lazy(() => SortOrderSchema).optional(),
  size: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  placeholder: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  defaultValue: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isUnique: z.lazy(() => SortOrderSchema).optional(),
  entity_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_entity_fieldsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => back3nd_entity_fieldsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_entity_fieldsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_entity_fieldsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => back3nd_entity_fieldsSumOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  columnName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  columnType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  placeholder: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  defaultValue: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isUnique: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  entity_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_password_resetWhereInputSchema: z.ZodType<Prisma.back3nd_password_resetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_password_resetWhereInputSchema),z.lazy(() => back3nd_password_resetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_password_resetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_password_resetWhereInputSchema),z.lazy(() => back3nd_password_resetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => Back3nd_userRelationFilterSchema),z.lazy(() => back3nd_userWhereInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_password_resetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => back3nd_userOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_password_resetOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_password_resetWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_password_resetWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => back3nd_password_resetWhereInputSchema),z.lazy(() => back3nd_password_resetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_password_resetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_password_resetWhereInputSchema),z.lazy(() => back3nd_password_resetWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => Back3nd_userRelationFilterSchema),z.lazy(() => back3nd_userWhereInputSchema) ]).optional(),
}).strict());

export const back3nd_password_resetOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_password_resetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_password_resetCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_password_resetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_password_resetMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_password_resetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_password_resetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_password_resetScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_password_resetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_password_resetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_password_resetScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_password_resetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutOwnerInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentCreateNestedManyWithoutSharedWithInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutAssignedToInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedCreateNestedManyWithoutSharedWithInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAssignedToInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentCreateInputSchema: z.ZodType<Prisma.DocumentCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
  sharedWith: z.lazy(() => SharedDocumentCreateNestedManyWithoutDocumentInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionCreateNestedManyWithoutDocumentInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutDocumentInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataCreateNestedOneWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  ownerId: z.string(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sharedWith: z.lazy(() => SharedDocumentUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUncheckedCreateNestedOneWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentUpdateInputSchema: z.ZodType<Prisma.DocumentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
  sharedWith: z.lazy(() => SharedDocumentUpdateManyWithoutDocumentNestedInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUpdateManyWithoutDocumentNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutDocumentNestedInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUpdateOneWithoutDocumentNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sharedWith: z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUncheckedUpdateOneWithoutDocumentNestedInputSchema).optional()
}).strict();

export const DocumentCreateManyInputSchema: z.ZodType<Prisma.DocumentCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  ownerId: z.string(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const DocumentUpdateManyMutationInputSchema: z.ZodType<Prisma.DocumentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentVersionCreateInputSchema: z.ZodType<Prisma.DocumentVersionCreateInput> = z.object({
  id: z.string().optional(),
  versionNumber: z.number().int(),
  filePath: z.string(),
  changesDescription: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  document: z.lazy(() => DocumentCreateNestedOneWithoutVersionsInputSchema),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedVersionsInputSchema)
}).strict();

export const DocumentVersionUncheckedCreateInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  versionNumber: z.number().int(),
  filePath: z.string(),
  changesDescription: z.string().optional().nullable(),
  createdById: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const DocumentVersionUpdateInputSchema: z.ZodType<Prisma.DocumentVersionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  changesDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  document: z.lazy(() => DocumentUpdateOneRequiredWithoutVersionsNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutCreatedVersionsNestedInputSchema).optional()
}).strict();

export const DocumentVersionUncheckedUpdateInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  changesDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentVersionCreateManyInputSchema: z.ZodType<Prisma.DocumentVersionCreateManyInput> = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  versionNumber: z.number().int(),
  filePath: z.string(),
  changesDescription: z.string().optional().nullable(),
  createdById: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const DocumentVersionUpdateManyMutationInputSchema: z.ZodType<Prisma.DocumentVersionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  changesDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentVersionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  changesDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkflowCreateInputSchema: z.ZodType<Prisma.WorkflowCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutWorkflowInputSchema).optional()
}).strict();

export const WorkflowUncheckedCreateInputSchema: z.ZodType<Prisma.WorkflowUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutWorkflowInputSchema).optional()
}).strict();

export const WorkflowUpdateInputSchema: z.ZodType<Prisma.WorkflowUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutWorkflowNestedInputSchema).optional()
}).strict();

export const WorkflowUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkflowUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutWorkflowNestedInputSchema).optional()
}).strict();

export const WorkflowCreateManyInputSchema: z.ZodType<Prisma.WorkflowCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const WorkflowUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkflowUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkflowUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkflowUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workflow: z.lazy(() => WorkflowCreateNestedOneWithoutTasksInputSchema),
  assignedTo: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  document: z.lazy(() => DocumentCreateNestedOneWithoutTasksInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateInputSchema: z.ZodType<Prisma.TaskUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  workflowId: z.string(),
  assignedToId: z.string().optional().nullable(),
  documentId: z.string().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUpdateInputSchema: z.ZodType<Prisma.TaskUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workflow: z.lazy(() => WorkflowUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  assignedTo: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  document: z.lazy(() => DocumentUpdateOneWithoutTasksNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workflowId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  documentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.object({
  id: z.string().optional(),
  workflowId: z.string(),
  assignedToId: z.string().optional().nullable(),
  documentId: z.string().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TaskUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workflowId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  documentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuditLogCreateInputSchema: z.ZodType<Prisma.AuditLogCreateInput> = z.object({
  id: z.string().optional(),
  action: z.string(),
  timestamp: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  task: z.lazy(() => TaskCreateNestedOneWithoutAuditLogsInputSchema),
  performedBy: z.lazy(() => UserCreateNestedOneWithoutAuditLogsInputSchema)
}).strict();

export const AuditLogUncheckedCreateInputSchema: z.ZodType<Prisma.AuditLogUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  taskId: z.string(),
  action: z.string(),
  performedById: z.string(),
  timestamp: z.coerce.date().optional(),
  description: z.string().optional().nullable()
}).strict();

export const AuditLogUpdateInputSchema: z.ZodType<Prisma.AuditLogUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutAuditLogsNestedInputSchema).optional(),
  performedBy: z.lazy(() => UserUpdateOneRequiredWithoutAuditLogsNestedInputSchema).optional()
}).strict();

export const AuditLogUncheckedUpdateInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AuditLogCreateManyInputSchema: z.ZodType<Prisma.AuditLogCreateManyInput> = z.object({
  id: z.string().optional(),
  taskId: z.string(),
  action: z.string(),
  performedById: z.string(),
  timestamp: z.coerce.date().optional(),
  description: z.string().optional().nullable()
}).strict();

export const AuditLogUpdateManyMutationInputSchema: z.ZodType<Prisma.AuditLogUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AuditLogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SharedDocumentCreateInputSchema: z.ZodType<Prisma.SharedDocumentCreateInput> = z.object({
  id: z.string().optional(),
  sharedAt: z.coerce.date().optional(),
  document: z.lazy(() => DocumentCreateNestedOneWithoutSharedWithInputSchema),
  sharedWith: z.lazy(() => UserCreateNestedOneWithoutSharedDocumentsInputSchema)
}).strict();

export const SharedDocumentUncheckedCreateInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  userId: z.string(),
  sharedAt: z.coerce.date().optional()
}).strict();

export const SharedDocumentUpdateInputSchema: z.ZodType<Prisma.SharedDocumentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sharedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  document: z.lazy(() => DocumentUpdateOneRequiredWithoutSharedWithNestedInputSchema).optional(),
  sharedWith: z.lazy(() => UserUpdateOneRequiredWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const SharedDocumentUncheckedUpdateInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sharedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SharedDocumentCreateManyInputSchema: z.ZodType<Prisma.SharedDocumentCreateManyInput> = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  userId: z.string(),
  sharedAt: z.coerce.date().optional()
}).strict();

export const SharedDocumentUpdateManyMutationInputSchema: z.ZodType<Prisma.SharedDocumentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sharedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SharedDocumentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sharedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DigitalCertificateCreateInputSchema: z.ZodType<Prisma.DigitalCertificateCreateInput> = z.object({
  id: z.string().optional(),
  filePath: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCertificatesInputSchema)
}).strict();

export const DigitalCertificateUncheckedCreateInputSchema: z.ZodType<Prisma.DigitalCertificateUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  filePath: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const DigitalCertificateUpdateInputSchema: z.ZodType<Prisma.DigitalCertificateUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCertificatesNestedInputSchema).optional()
}).strict();

export const DigitalCertificateUncheckedUpdateInputSchema: z.ZodType<Prisma.DigitalCertificateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DigitalCertificateCreateManyInputSchema: z.ZodType<Prisma.DigitalCertificateCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  filePath: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const DigitalCertificateUpdateManyMutationInputSchema: z.ZodType<Prisma.DigitalCertificateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DigitalCertificateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DigitalCertificateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileMetadataCreateInputSchema: z.ZodType<Prisma.FileMetadataCreateInput> = z.object({
  id: z.string().optional(),
  fileSize: z.number().int(),
  mimeType: z.string(),
  checksum: z.string(),
  createdAt: z.coerce.date().optional(),
  document: z.lazy(() => DocumentCreateNestedOneWithoutFileMetadataInputSchema)
}).strict();

export const FileMetadataUncheckedCreateInputSchema: z.ZodType<Prisma.FileMetadataUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  fileSize: z.number().int(),
  mimeType: z.string(),
  checksum: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FileMetadataUpdateInputSchema: z.ZodType<Prisma.FileMetadataUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileSize: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checksum: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  document: z.lazy(() => DocumentUpdateOneRequiredWithoutFileMetadataNestedInputSchema).optional()
}).strict();

export const FileMetadataUncheckedUpdateInputSchema: z.ZodType<Prisma.FileMetadataUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileSize: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checksum: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileMetadataCreateManyInputSchema: z.ZodType<Prisma.FileMetadataCreateManyInput> = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  fileSize: z.number().int(),
  mimeType: z.string(),
  checksum: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FileMetadataUpdateManyMutationInputSchema: z.ZodType<Prisma.FileMetadataUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileSize: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checksum: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileMetadataUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FileMetadataUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileSize: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checksum: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_userCreateInputSchema: z.ZodType<Prisma.back3nd_userCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => back3nd_user_roleCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_userUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => back3nd_user_roleUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userUpdateInputSchema: z.ZodType<Prisma.back3nd_userUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => back3nd_user_roleUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const back3nd_userUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_userUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const back3nd_userCreateManyInputSchema: z.ZodType<Prisma.back3nd_userCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const back3nd_userUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_userUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_userUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_userUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_roleCreateInputSchema: z.ZodType<Prisma.back3nd_roleCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  permissions: z.lazy(() => back3nd_permissionCreateNestedManyWithoutRoleInputSchema).optional(),
  users: z.lazy(() => back3nd_user_roleCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  permissions: z.lazy(() => back3nd_permissionUncheckedCreateNestedManyWithoutRoleInputSchema).optional(),
  users: z.lazy(() => back3nd_user_roleUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleUpdateInputSchema: z.ZodType<Prisma.back3nd_roleUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => back3nd_permissionUpdateManyWithoutRoleNestedInputSchema).optional(),
  users: z.lazy(() => back3nd_user_roleUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutRoleNestedInputSchema).optional(),
  users: z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_roleCreateManyInputSchema: z.ZodType<Prisma.back3nd_roleCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const back3nd_roleUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_roleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_roleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleCreateInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  role: z.lazy(() => back3nd_roleCreateNestedOneWithoutUsersInputSchema),
  user: z.lazy(() => back3nd_userCreateNestedOneWithoutRolesInputSchema)
}).strict();

export const back3nd_user_roleUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  role_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_user_roleUpdateInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => back3nd_roleUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  user: z.lazy(() => back3nd_userUpdateOneRequiredWithoutRolesNestedInputSchema).optional()
}).strict();

export const back3nd_user_roleUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleCreateManyInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  role_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_user_roleUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionCreateInputSchema: z.ZodType<Prisma.back3nd_permissionCreateInput> = z.object({
  id: z.string().optional(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  role: z.lazy(() => back3nd_roleCreateNestedOneWithoutPermissionsInputSchema),
  table: z.lazy(() => back3nd_entityCreateNestedOneWithoutBack3nd_permissionInputSchema)
}).strict();

export const back3nd_permissionUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  table_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionUpdateInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => back3nd_roleUpdateOneRequiredWithoutPermissionsNestedInputSchema).optional(),
  table: z.lazy(() => back3nd_entityUpdateOneRequiredWithoutBack3nd_permissionNestedInputSchema).optional()
}).strict();

export const back3nd_permissionUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionCreateManyInputSchema: z.ZodType<Prisma.back3nd_permissionCreateManyInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  table_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entityCreateInputSchema: z.ZodType<Prisma.back3nd_entityCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsCreateNestedManyWithoutBack3nd_entityInputSchema).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionCreateNestedManyWithoutTableInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUncheckedCreateNestedManyWithoutBack3nd_entityInputSchema).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUncheckedCreateNestedManyWithoutTableInputSchema).optional()
}).strict();

export const back3nd_entityUpdateInputSchema: z.ZodType<Prisma.back3nd_entityUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUpdateManyWithoutBack3nd_entityNestedInputSchema).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUpdateManyWithoutTableNestedInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityNestedInputSchema).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutTableNestedInputSchema).optional()
}).strict();

export const back3nd_entityCreateManyInputSchema: z.ZodType<Prisma.back3nd_entityCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const back3nd_entityUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_entityUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsCreateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  created_at: z.coerce.date().optional(),
  back3nd_entity: z.lazy(() => back3nd_entityCreateNestedOneWithoutBack3nd_entity_fieldsInputSchema)
}).strict();

export const back3nd_entity_fieldsUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  entity_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_entity_fieldsUpdateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_entity: z.lazy(() => back3nd_entityUpdateOneRequiredWithoutBack3nd_entity_fieldsNestedInputSchema).optional()
}).strict();

export const back3nd_entity_fieldsUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entity_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsCreateManyInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateManyInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  entity_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_entity_fieldsUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entity_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetCreateInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date(),
  user: z.lazy(() => back3nd_userCreateNestedOneWithoutBack3nd_password_resetInputSchema)
}).strict();

export const back3nd_password_resetUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date()
}).strict();

export const back3nd_password_resetUpdateInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => back3nd_userUpdateOneRequiredWithoutBack3nd_password_resetNestedInputSchema).optional()
}).strict();

export const back3nd_password_resetUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetCreateManyInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateManyInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date()
}).strict();

export const back3nd_password_resetUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DocumentListRelationFilterSchema: z.ZodType<Prisma.DocumentListRelationFilter> = z.object({
  every: z.lazy(() => DocumentWhereInputSchema).optional(),
  some: z.lazy(() => DocumentWhereInputSchema).optional(),
  none: z.lazy(() => DocumentWhereInputSchema).optional()
}).strict();

export const SharedDocumentListRelationFilterSchema: z.ZodType<Prisma.SharedDocumentListRelationFilter> = z.object({
  every: z.lazy(() => SharedDocumentWhereInputSchema).optional(),
  some: z.lazy(() => SharedDocumentWhereInputSchema).optional(),
  none: z.lazy(() => SharedDocumentWhereInputSchema).optional()
}).strict();

export const DigitalCertificateListRelationFilterSchema: z.ZodType<Prisma.DigitalCertificateListRelationFilter> = z.object({
  every: z.lazy(() => DigitalCertificateWhereInputSchema).optional(),
  some: z.lazy(() => DigitalCertificateWhereInputSchema).optional(),
  none: z.lazy(() => DigitalCertificateWhereInputSchema).optional()
}).strict();

export const TaskListRelationFilterSchema: z.ZodType<Prisma.TaskListRelationFilter> = z.object({
  every: z.lazy(() => TaskWhereInputSchema).optional(),
  some: z.lazy(() => TaskWhereInputSchema).optional(),
  none: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const DocumentVersionListRelationFilterSchema: z.ZodType<Prisma.DocumentVersionListRelationFilter> = z.object({
  every: z.lazy(() => DocumentVersionWhereInputSchema).optional(),
  some: z.lazy(() => DocumentVersionWhereInputSchema).optional(),
  none: z.lazy(() => DocumentVersionWhereInputSchema).optional()
}).strict();

export const AuditLogListRelationFilterSchema: z.ZodType<Prisma.AuditLogListRelationFilter> = z.object({
  every: z.lazy(() => AuditLogWhereInputSchema).optional(),
  some: z.lazy(() => AuditLogWhereInputSchema).optional(),
  none: z.lazy(() => AuditLogWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const DocumentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DocumentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SharedDocumentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SharedDocumentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DigitalCertificateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DigitalCertificateOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentVersionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DocumentVersionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuditLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuditLogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserOrderByRelevanceInputSchema: z.ZodType<Prisma.UserOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => UserOrderByRelevanceFieldEnumSchema),z.lazy(() => UserOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  apiUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  apiUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  apiUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const FileMetadataNullableRelationFilterSchema: z.ZodType<Prisma.FileMetadataNullableRelationFilter> = z.object({
  is: z.lazy(() => FileMetadataWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => FileMetadataWhereInputSchema).optional().nullable()
}).strict();

export const DocumentOrderByRelevanceInputSchema: z.ZodType<Prisma.DocumentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => DocumentOrderByRelevanceFieldEnumSchema),z.lazy(() => DocumentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const DocumentCountOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  keywords: z.lazy(() => SortOrderSchema).optional(),
  ocrText: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  signed: z.lazy(() => SortOrderSchema).optional(),
  signedAt: z.lazy(() => SortOrderSchema).optional(),
  signature: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  ocrText: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  signed: z.lazy(() => SortOrderSchema).optional(),
  signedAt: z.lazy(() => SortOrderSchema).optional(),
  signature: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentMinOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  ocrText: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  signed: z.lazy(() => SortOrderSchema).optional(),
  signedAt: z.lazy(() => SortOrderSchema).optional(),
  signature: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DocumentRelationFilterSchema: z.ZodType<Prisma.DocumentRelationFilter> = z.object({
  is: z.lazy(() => DocumentWhereInputSchema).optional(),
  isNot: z.lazy(() => DocumentWhereInputSchema).optional()
}).strict();

export const DocumentVersionOrderByRelevanceInputSchema: z.ZodType<Prisma.DocumentVersionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => DocumentVersionOrderByRelevanceFieldEnumSchema),z.lazy(() => DocumentVersionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const DocumentVersionCountOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentVersionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  versionNumber: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  changesDescription: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentVersionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentVersionAvgOrderByAggregateInput> = z.object({
  versionNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentVersionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentVersionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  versionNumber: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  changesDescription: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentVersionMinOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentVersionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  versionNumber: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  changesDescription: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentVersionSumOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentVersionSumOrderByAggregateInput> = z.object({
  versionNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const WorkflowOrderByRelevanceInputSchema: z.ZodType<Prisma.WorkflowOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => WorkflowOrderByRelevanceFieldEnumSchema),z.lazy(() => WorkflowOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const WorkflowCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkflowCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkflowMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkflowMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkflowMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkflowMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const WorkflowRelationFilterSchema: z.ZodType<Prisma.WorkflowRelationFilter> = z.object({
  is: z.lazy(() => WorkflowWhereInputSchema).optional(),
  isNot: z.lazy(() => WorkflowWhereInputSchema).optional()
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const DocumentNullableRelationFilterSchema: z.ZodType<Prisma.DocumentNullableRelationFilter> = z.object({
  is: z.lazy(() => DocumentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DocumentWhereInputSchema).optional().nullable()
}).strict();

export const TaskOrderByRelevanceInputSchema: z.ZodType<Prisma.TaskOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => TaskOrderByRelevanceFieldEnumSchema),z.lazy(() => TaskOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const TaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workflowId: z.lazy(() => SortOrderSchema).optional(),
  assignedToId: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workflowId: z.lazy(() => SortOrderSchema).optional(),
  assignedToId: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workflowId: z.lazy(() => SortOrderSchema).optional(),
  assignedToId: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const TaskRelationFilterSchema: z.ZodType<Prisma.TaskRelationFilter> = z.object({
  is: z.lazy(() => TaskWhereInputSchema).optional(),
  isNot: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const AuditLogOrderByRelevanceInputSchema: z.ZodType<Prisma.AuditLogOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => AuditLogOrderByRelevanceFieldEnumSchema),z.lazy(() => AuditLogOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const AuditLogCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuditLogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  performedById: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuditLogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuditLogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  performedById: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuditLogMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuditLogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  performedById: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SharedDocumentOrderByRelevanceInputSchema: z.ZodType<Prisma.SharedDocumentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => SharedDocumentOrderByRelevanceFieldEnumSchema),z.lazy(() => SharedDocumentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const SharedDocumentCountOrderByAggregateInputSchema: z.ZodType<Prisma.SharedDocumentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  sharedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SharedDocumentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SharedDocumentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  sharedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SharedDocumentMinOrderByAggregateInputSchema: z.ZodType<Prisma.SharedDocumentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  sharedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DigitalCertificateOrderByRelevanceInputSchema: z.ZodType<Prisma.DigitalCertificateOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => DigitalCertificateOrderByRelevanceFieldEnumSchema),z.lazy(() => DigitalCertificateOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const DigitalCertificateCountOrderByAggregateInputSchema: z.ZodType<Prisma.DigitalCertificateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DigitalCertificateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DigitalCertificateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DigitalCertificateMinOrderByAggregateInputSchema: z.ZodType<Prisma.DigitalCertificateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMetadataOrderByRelevanceInputSchema: z.ZodType<Prisma.FileMetadataOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => FileMetadataOrderByRelevanceFieldEnumSchema),z.lazy(() => FileMetadataOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const FileMetadataCountOrderByAggregateInputSchema: z.ZodType<Prisma.FileMetadataCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  fileSize: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  checksum: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMetadataAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FileMetadataAvgOrderByAggregateInput> = z.object({
  fileSize: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMetadataMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FileMetadataMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  fileSize: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  checksum: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMetadataMinOrderByAggregateInputSchema: z.ZodType<Prisma.FileMetadataMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  fileSize: z.lazy(() => SortOrderSchema).optional(),
  mimeType: z.lazy(() => SortOrderSchema).optional(),
  checksum: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMetadataSumOrderByAggregateInputSchema: z.ZodType<Prisma.FileMetadataSumOrderByAggregateInput> = z.object({
  fileSize: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Back3nd_password_resetListRelationFilterSchema: z.ZodType<Prisma.Back3nd_password_resetListRelationFilter> = z.object({
  every: z.lazy(() => back3nd_password_resetWhereInputSchema).optional(),
  some: z.lazy(() => back3nd_password_resetWhereInputSchema).optional(),
  none: z.lazy(() => back3nd_password_resetWhereInputSchema).optional()
}).strict();

export const Back3nd_user_roleListRelationFilterSchema: z.ZodType<Prisma.Back3nd_user_roleListRelationFilter> = z.object({
  every: z.lazy(() => back3nd_user_roleWhereInputSchema).optional(),
  some: z.lazy(() => back3nd_user_roleWhereInputSchema).optional(),
  none: z.lazy(() => back3nd_user_roleWhereInputSchema).optional()
}).strict();

export const back3nd_password_resetOrderByRelationAggregateInputSchema: z.ZodType<Prisma.back3nd_password_resetOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_user_roleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.back3nd_user_roleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_userOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_userOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_userOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_userOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_userCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_userCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reset_token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_userMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_userMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reset_token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_userMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_userMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reset_token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Back3nd_permissionListRelationFilterSchema: z.ZodType<Prisma.Back3nd_permissionListRelationFilter> = z.object({
  every: z.lazy(() => back3nd_permissionWhereInputSchema).optional(),
  some: z.lazy(() => back3nd_permissionWhereInputSchema).optional(),
  none: z.lazy(() => back3nd_permissionWhereInputSchema).optional()
}).strict();

export const back3nd_permissionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.back3nd_permissionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_roleOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_roleOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_roleOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_roleOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_roleCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_roleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_roleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_roleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_roleMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_roleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Back3nd_roleRelationFilterSchema: z.ZodType<Prisma.Back3nd_roleRelationFilter> = z.object({
  is: z.lazy(() => back3nd_roleWhereInputSchema).optional(),
  isNot: z.lazy(() => back3nd_roleWhereInputSchema).optional()
}).strict();

export const Back3nd_userRelationFilterSchema: z.ZodType<Prisma.Back3nd_userRelationFilter> = z.object({
  is: z.lazy(() => back3nd_userWhereInputSchema).optional(),
  isNot: z.lazy(() => back3nd_userWhereInputSchema).optional()
}).strict();

export const back3nd_user_roleOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_user_roleOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_user_roleOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_user_roleOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_user_roleUser_idRole_idCompoundUniqueInputSchema: z.ZodType<Prisma.back3nd_user_roleUser_idRole_idCompoundUniqueInput> = z.object({
  user_id: z.string(),
  role_id: z.string()
}).strict();

export const back3nd_user_roleCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_user_roleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_user_roleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_user_roleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_user_roleMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_user_roleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Back3nd_entityRelationFilterSchema: z.ZodType<Prisma.Back3nd_entityRelationFilter> = z.object({
  is: z.lazy(() => back3nd_entityWhereInputSchema).optional(),
  isNot: z.lazy(() => back3nd_entityWhereInputSchema).optional()
}).strict();

export const back3nd_permissionOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_permissionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_permissionOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_permissionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_permissionRole_idTable_idCompoundUniqueInputSchema: z.ZodType<Prisma.back3nd_permissionRole_idTable_idCompoundUniqueInput> = z.object({
  role_id: z.string(),
  table_id: z.string()
}).strict();

export const back3nd_permissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_permissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_permissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_permissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_permissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_permissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Back3nd_entity_fieldsListRelationFilterSchema: z.ZodType<Prisma.Back3nd_entity_fieldsListRelationFilter> = z.object({
  every: z.lazy(() => back3nd_entity_fieldsWhereInputSchema).optional(),
  some: z.lazy(() => back3nd_entity_fieldsWhereInputSchema).optional(),
  none: z.lazy(() => back3nd_entity_fieldsWhereInputSchema).optional()
}).strict();

export const back3nd_entity_fieldsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entityOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_entityOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_entityOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_entityOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_entityCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entityMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const back3nd_entity_fieldsOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_entity_fieldsOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_entity_fieldsOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_entity_fieldsEntity_idColumnNameCompoundUniqueInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsEntity_idColumnNameCompoundUniqueInput> = z.object({
  entity_id: z.string(),
  columnName: z.string()
}).strict();

export const back3nd_entity_fieldsCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnName: z.lazy(() => SortOrderSchema).optional(),
  columnType: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  placeholder: z.lazy(() => SortOrderSchema).optional(),
  defaultValue: z.lazy(() => SortOrderSchema).optional(),
  isUnique: z.lazy(() => SortOrderSchema).optional(),
  entity_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entity_fieldsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsAvgOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entity_fieldsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnName: z.lazy(() => SortOrderSchema).optional(),
  columnType: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  placeholder: z.lazy(() => SortOrderSchema).optional(),
  defaultValue: z.lazy(() => SortOrderSchema).optional(),
  isUnique: z.lazy(() => SortOrderSchema).optional(),
  entity_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entity_fieldsMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnName: z.lazy(() => SortOrderSchema).optional(),
  columnType: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  placeholder: z.lazy(() => SortOrderSchema).optional(),
  defaultValue: z.lazy(() => SortOrderSchema).optional(),
  isUnique: z.lazy(() => SortOrderSchema).optional(),
  entity_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entity_fieldsSumOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsSumOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const back3nd_password_resetOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_password_resetOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_password_resetOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_password_resetOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_password_resetCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_password_resetCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_password_resetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_password_resetMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_password_resetMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_password_resetMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.DocumentCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutOwnerInputSchema),z.lazy(() => DocumentCreateWithoutOwnerInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SharedDocumentCreateNestedManyWithoutSharedWithInputSchema: z.ZodType<Prisma.SharedDocumentCreateNestedManyWithoutSharedWithInput> = z.object({
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentCreateWithoutSharedWithInputSchema).array(),z.lazy(() => SharedDocumentUncheckedCreateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutSharedWithInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SharedDocumentCreateOrConnectWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentCreateOrConnectWithoutSharedWithInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SharedDocumentCreateManySharedWithInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DigitalCertificateCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DigitalCertificateCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => DigitalCertificateCreateWithoutUserInputSchema),z.lazy(() => DigitalCertificateCreateWithoutUserInputSchema).array(),z.lazy(() => DigitalCertificateUncheckedCreateWithoutUserInputSchema),z.lazy(() => DigitalCertificateUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DigitalCertificateCreateOrConnectWithoutUserInputSchema),z.lazy(() => DigitalCertificateCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DigitalCertificateCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DigitalCertificateWhereUniqueInputSchema),z.lazy(() => DigitalCertificateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutAssignedToInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskCreateWithoutAssignedToInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssignedToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentVersionCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionCreateWithoutCreatedByInputSchema).array(),z.lazy(() => DocumentVersionUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentVersionCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentVersionCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuditLogCreateNestedManyWithoutPerformedByInputSchema: z.ZodType<Prisma.AuditLogCreateNestedManyWithoutPerformedByInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutPerformedByInputSchema),z.lazy(() => AuditLogCreateWithoutPerformedByInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutPerformedByInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutPerformedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutPerformedByInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutPerformedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyPerformedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutOwnerInputSchema),z.lazy(() => DocumentCreateWithoutOwnerInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SharedDocumentUncheckedCreateNestedManyWithoutSharedWithInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedCreateNestedManyWithoutSharedWithInput> = z.object({
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentCreateWithoutSharedWithInputSchema).array(),z.lazy(() => SharedDocumentUncheckedCreateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutSharedWithInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SharedDocumentCreateOrConnectWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentCreateOrConnectWithoutSharedWithInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SharedDocumentCreateManySharedWithInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DigitalCertificateUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DigitalCertificateUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => DigitalCertificateCreateWithoutUserInputSchema),z.lazy(() => DigitalCertificateCreateWithoutUserInputSchema).array(),z.lazy(() => DigitalCertificateUncheckedCreateWithoutUserInputSchema),z.lazy(() => DigitalCertificateUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DigitalCertificateCreateOrConnectWithoutUserInputSchema),z.lazy(() => DigitalCertificateCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DigitalCertificateCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DigitalCertificateWhereUniqueInputSchema),z.lazy(() => DigitalCertificateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedCreateNestedManyWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskCreateWithoutAssignedToInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssignedToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentVersionUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionCreateWithoutCreatedByInputSchema).array(),z.lazy(() => DocumentVersionUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentVersionCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentVersionCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuditLogUncheckedCreateNestedManyWithoutPerformedByInputSchema: z.ZodType<Prisma.AuditLogUncheckedCreateNestedManyWithoutPerformedByInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutPerformedByInputSchema),z.lazy(() => AuditLogCreateWithoutPerformedByInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutPerformedByInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutPerformedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutPerformedByInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutPerformedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyPerformedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const DocumentUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutOwnerInputSchema),z.lazy(() => DocumentCreateWithoutOwnerInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SharedDocumentUpdateManyWithoutSharedWithNestedInputSchema: z.ZodType<Prisma.SharedDocumentUpdateManyWithoutSharedWithNestedInput> = z.object({
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentCreateWithoutSharedWithInputSchema).array(),z.lazy(() => SharedDocumentUncheckedCreateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutSharedWithInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SharedDocumentCreateOrConnectWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentCreateOrConnectWithoutSharedWithInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SharedDocumentUpsertWithWhereUniqueWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUpsertWithWhereUniqueWithoutSharedWithInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SharedDocumentCreateManySharedWithInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SharedDocumentUpdateWithWhereUniqueWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUpdateWithWhereUniqueWithoutSharedWithInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SharedDocumentUpdateManyWithWhereWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUpdateManyWithWhereWithoutSharedWithInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SharedDocumentScalarWhereInputSchema),z.lazy(() => SharedDocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DigitalCertificateUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DigitalCertificateUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DigitalCertificateCreateWithoutUserInputSchema),z.lazy(() => DigitalCertificateCreateWithoutUserInputSchema).array(),z.lazy(() => DigitalCertificateUncheckedCreateWithoutUserInputSchema),z.lazy(() => DigitalCertificateUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DigitalCertificateCreateOrConnectWithoutUserInputSchema),z.lazy(() => DigitalCertificateCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DigitalCertificateUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DigitalCertificateUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DigitalCertificateCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DigitalCertificateWhereUniqueInputSchema),z.lazy(() => DigitalCertificateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DigitalCertificateWhereUniqueInputSchema),z.lazy(() => DigitalCertificateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DigitalCertificateWhereUniqueInputSchema),z.lazy(() => DigitalCertificateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DigitalCertificateWhereUniqueInputSchema),z.lazy(() => DigitalCertificateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DigitalCertificateUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DigitalCertificateUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DigitalCertificateUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => DigitalCertificateUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DigitalCertificateScalarWhereInputSchema),z.lazy(() => DigitalCertificateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutAssignedToNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutAssignedToNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskCreateWithoutAssignedToInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssignedToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutAssignedToInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutAssignedToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentVersionUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.DocumentVersionUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionCreateWithoutCreatedByInputSchema).array(),z.lazy(() => DocumentVersionUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentVersionCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentVersionUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentVersionCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentVersionUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentVersionUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentVersionScalarWhereInputSchema),z.lazy(() => DocumentVersionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuditLogUpdateManyWithoutPerformedByNestedInputSchema: z.ZodType<Prisma.AuditLogUpdateManyWithoutPerformedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutPerformedByInputSchema),z.lazy(() => AuditLogCreateWithoutPerformedByInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutPerformedByInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutPerformedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutPerformedByInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutPerformedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutPerformedByInputSchema),z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutPerformedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyPerformedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutPerformedByInputSchema),z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutPerformedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuditLogUpdateManyWithWhereWithoutPerformedByInputSchema),z.lazy(() => AuditLogUpdateManyWithWhereWithoutPerformedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuditLogScalarWhereInputSchema),z.lazy(() => AuditLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutOwnerInputSchema),z.lazy(() => DocumentCreateWithoutOwnerInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SharedDocumentUncheckedUpdateManyWithoutSharedWithNestedInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedUpdateManyWithoutSharedWithNestedInput> = z.object({
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentCreateWithoutSharedWithInputSchema).array(),z.lazy(() => SharedDocumentUncheckedCreateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutSharedWithInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SharedDocumentCreateOrConnectWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentCreateOrConnectWithoutSharedWithInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SharedDocumentUpsertWithWhereUniqueWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUpsertWithWhereUniqueWithoutSharedWithInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SharedDocumentCreateManySharedWithInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SharedDocumentUpdateWithWhereUniqueWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUpdateWithWhereUniqueWithoutSharedWithInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SharedDocumentUpdateManyWithWhereWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUpdateManyWithWhereWithoutSharedWithInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SharedDocumentScalarWhereInputSchema),z.lazy(() => SharedDocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DigitalCertificateUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DigitalCertificateUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DigitalCertificateCreateWithoutUserInputSchema),z.lazy(() => DigitalCertificateCreateWithoutUserInputSchema).array(),z.lazy(() => DigitalCertificateUncheckedCreateWithoutUserInputSchema),z.lazy(() => DigitalCertificateUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DigitalCertificateCreateOrConnectWithoutUserInputSchema),z.lazy(() => DigitalCertificateCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DigitalCertificateUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DigitalCertificateUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DigitalCertificateCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DigitalCertificateWhereUniqueInputSchema),z.lazy(() => DigitalCertificateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DigitalCertificateWhereUniqueInputSchema),z.lazy(() => DigitalCertificateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DigitalCertificateWhereUniqueInputSchema),z.lazy(() => DigitalCertificateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DigitalCertificateWhereUniqueInputSchema),z.lazy(() => DigitalCertificateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DigitalCertificateUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DigitalCertificateUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DigitalCertificateUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => DigitalCertificateUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DigitalCertificateScalarWhereInputSchema),z.lazy(() => DigitalCertificateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutAssignedToNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskCreateWithoutAssignedToInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema),z.lazy(() => TaskCreateOrConnectWithoutAssignedToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyAssignedToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssignedToInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutAssignedToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutAssignedToInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutAssignedToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentVersionUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionCreateWithoutCreatedByInputSchema).array(),z.lazy(() => DocumentVersionUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentVersionCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentVersionUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentVersionCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentVersionUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentVersionUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentVersionScalarWhereInputSchema),z.lazy(() => DocumentVersionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuditLogUncheckedUpdateManyWithoutPerformedByNestedInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutPerformedByInputSchema),z.lazy(() => AuditLogCreateWithoutPerformedByInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutPerformedByInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutPerformedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutPerformedByInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutPerformedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutPerformedByInputSchema),z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutPerformedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyPerformedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutPerformedByInputSchema),z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutPerformedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuditLogUpdateManyWithWhereWithoutPerformedByInputSchema),z.lazy(() => AuditLogUpdateManyWithWhereWithoutPerformedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuditLogScalarWhereInputSchema),z.lazy(() => AuditLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentCreatekeywordsInputSchema: z.ZodType<Prisma.DocumentCreatekeywordsInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedOneWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDocumentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SharedDocumentCreateNestedManyWithoutDocumentInputSchema: z.ZodType<Prisma.SharedDocumentCreateNestedManyWithoutDocumentInput> = z.object({
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentCreateWithoutDocumentInputSchema).array(),z.lazy(() => SharedDocumentUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SharedDocumentCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => SharedDocumentCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SharedDocumentCreateManyDocumentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentVersionCreateNestedManyWithoutDocumentInputSchema: z.ZodType<Prisma.DocumentVersionCreateNestedManyWithoutDocumentInput> = z.object({
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionCreateWithoutDocumentInputSchema).array(),z.lazy(() => DocumentVersionUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentVersionCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => DocumentVersionCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentVersionCreateManyDocumentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutDocumentInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutDocumentInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutDocumentInputSchema),z.lazy(() => TaskCreateWithoutDocumentInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => TaskCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyDocumentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FileMetadataCreateNestedOneWithoutDocumentInputSchema: z.ZodType<Prisma.FileMetadataCreateNestedOneWithoutDocumentInput> = z.object({
  create: z.union([ z.lazy(() => FileMetadataCreateWithoutDocumentInputSchema),z.lazy(() => FileMetadataUncheckedCreateWithoutDocumentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FileMetadataCreateOrConnectWithoutDocumentInputSchema).optional(),
  connect: z.lazy(() => FileMetadataWhereUniqueInputSchema).optional()
}).strict();

export const SharedDocumentUncheckedCreateNestedManyWithoutDocumentInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedCreateNestedManyWithoutDocumentInput> = z.object({
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentCreateWithoutDocumentInputSchema).array(),z.lazy(() => SharedDocumentUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SharedDocumentCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => SharedDocumentCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SharedDocumentCreateManyDocumentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentVersionUncheckedCreateNestedManyWithoutDocumentInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedCreateNestedManyWithoutDocumentInput> = z.object({
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionCreateWithoutDocumentInputSchema).array(),z.lazy(() => DocumentVersionUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentVersionCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => DocumentVersionCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentVersionCreateManyDocumentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedCreateNestedManyWithoutDocumentInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutDocumentInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutDocumentInputSchema),z.lazy(() => TaskCreateWithoutDocumentInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => TaskCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyDocumentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FileMetadataUncheckedCreateNestedOneWithoutDocumentInputSchema: z.ZodType<Prisma.FileMetadataUncheckedCreateNestedOneWithoutDocumentInput> = z.object({
  create: z.union([ z.lazy(() => FileMetadataCreateWithoutDocumentInputSchema),z.lazy(() => FileMetadataUncheckedCreateWithoutDocumentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FileMetadataCreateOrConnectWithoutDocumentInputSchema).optional(),
  connect: z.lazy(() => FileMetadataWhereUniqueInputSchema).optional()
}).strict();

export const DocumentUpdatekeywordsInputSchema: z.ZodType<Prisma.DocumentUpdatekeywordsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDocumentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDocumentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDocumentsInputSchema),z.lazy(() => UserUpdateWithoutDocumentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]).optional(),
}).strict();

export const SharedDocumentUpdateManyWithoutDocumentNestedInputSchema: z.ZodType<Prisma.SharedDocumentUpdateManyWithoutDocumentNestedInput> = z.object({
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentCreateWithoutDocumentInputSchema).array(),z.lazy(() => SharedDocumentUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SharedDocumentCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => SharedDocumentCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SharedDocumentUpsertWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUpsertWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SharedDocumentCreateManyDocumentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SharedDocumentUpdateWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUpdateWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SharedDocumentUpdateManyWithWhereWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUpdateManyWithWhereWithoutDocumentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SharedDocumentScalarWhereInputSchema),z.lazy(() => SharedDocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentVersionUpdateManyWithoutDocumentNestedInputSchema: z.ZodType<Prisma.DocumentVersionUpdateManyWithoutDocumentNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionCreateWithoutDocumentInputSchema).array(),z.lazy(() => DocumentVersionUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentVersionCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => DocumentVersionCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentVersionUpsertWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUpsertWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentVersionCreateManyDocumentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentVersionUpdateWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUpdateWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentVersionUpdateManyWithWhereWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUpdateManyWithWhereWithoutDocumentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentVersionScalarWhereInputSchema),z.lazy(() => DocumentVersionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutDocumentNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutDocumentNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutDocumentInputSchema),z.lazy(() => TaskCreateWithoutDocumentInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => TaskCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyDocumentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutDocumentInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutDocumentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FileMetadataUpdateOneWithoutDocumentNestedInputSchema: z.ZodType<Prisma.FileMetadataUpdateOneWithoutDocumentNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileMetadataCreateWithoutDocumentInputSchema),z.lazy(() => FileMetadataUncheckedCreateWithoutDocumentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FileMetadataCreateOrConnectWithoutDocumentInputSchema).optional(),
  upsert: z.lazy(() => FileMetadataUpsertWithoutDocumentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => FileMetadataWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => FileMetadataWhereInputSchema) ]).optional(),
  connect: z.lazy(() => FileMetadataWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FileMetadataUpdateToOneWithWhereWithoutDocumentInputSchema),z.lazy(() => FileMetadataUpdateWithoutDocumentInputSchema),z.lazy(() => FileMetadataUncheckedUpdateWithoutDocumentInputSchema) ]).optional(),
}).strict();

export const SharedDocumentUncheckedUpdateManyWithoutDocumentNestedInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedUpdateManyWithoutDocumentNestedInput> = z.object({
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentCreateWithoutDocumentInputSchema).array(),z.lazy(() => SharedDocumentUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SharedDocumentCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => SharedDocumentCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SharedDocumentUpsertWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUpsertWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SharedDocumentCreateManyDocumentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SharedDocumentWhereUniqueInputSchema),z.lazy(() => SharedDocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SharedDocumentUpdateWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUpdateWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SharedDocumentUpdateManyWithWhereWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUpdateManyWithWhereWithoutDocumentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SharedDocumentScalarWhereInputSchema),z.lazy(() => SharedDocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionCreateWithoutDocumentInputSchema).array(),z.lazy(() => DocumentVersionUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentVersionCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => DocumentVersionCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentVersionUpsertWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUpsertWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentVersionCreateManyDocumentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentVersionWhereUniqueInputSchema),z.lazy(() => DocumentVersionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentVersionUpdateWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUpdateWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentVersionUpdateManyWithWhereWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUpdateManyWithWhereWithoutDocumentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentVersionScalarWhereInputSchema),z.lazy(() => DocumentVersionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutDocumentNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutDocumentNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutDocumentInputSchema),z.lazy(() => TaskCreateWithoutDocumentInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => TaskCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyDocumentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutDocumentInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutDocumentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FileMetadataUncheckedUpdateOneWithoutDocumentNestedInputSchema: z.ZodType<Prisma.FileMetadataUncheckedUpdateOneWithoutDocumentNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileMetadataCreateWithoutDocumentInputSchema),z.lazy(() => FileMetadataUncheckedCreateWithoutDocumentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FileMetadataCreateOrConnectWithoutDocumentInputSchema).optional(),
  upsert: z.lazy(() => FileMetadataUpsertWithoutDocumentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => FileMetadataWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => FileMetadataWhereInputSchema) ]).optional(),
  connect: z.lazy(() => FileMetadataWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FileMetadataUpdateToOneWithWhereWithoutDocumentInputSchema),z.lazy(() => FileMetadataUpdateWithoutDocumentInputSchema),z.lazy(() => FileMetadataUncheckedUpdateWithoutDocumentInputSchema) ]).optional(),
}).strict();

export const DocumentCreateNestedOneWithoutVersionsInputSchema: z.ZodType<Prisma.DocumentCreateNestedOneWithoutVersionsInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutVersionsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutVersionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutVersionsInputSchema).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutCreatedVersionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedVersionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedVersionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedVersionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedVersionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DocumentUpdateOneRequiredWithoutVersionsNestedInputSchema: z.ZodType<Prisma.DocumentUpdateOneRequiredWithoutVersionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutVersionsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutVersionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutVersionsInputSchema).optional(),
  upsert: z.lazy(() => DocumentUpsertWithoutVersionsInputSchema).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateToOneWithWhereWithoutVersionsInputSchema),z.lazy(() => DocumentUpdateWithoutVersionsInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutVersionsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCreatedVersionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCreatedVersionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedVersionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedVersionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedVersionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedVersionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedVersionsInputSchema),z.lazy(() => UserUpdateWithoutCreatedVersionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedVersionsInputSchema) ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutWorkflowInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutWorkflowInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutWorkflowInputSchema),z.lazy(() => TaskCreateWithoutWorkflowInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutWorkflowInputSchema),z.lazy(() => TaskUncheckedCreateWithoutWorkflowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutWorkflowInputSchema),z.lazy(() => TaskCreateOrConnectWithoutWorkflowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyWorkflowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedCreateNestedManyWithoutWorkflowInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutWorkflowInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutWorkflowInputSchema),z.lazy(() => TaskCreateWithoutWorkflowInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutWorkflowInputSchema),z.lazy(() => TaskUncheckedCreateWithoutWorkflowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutWorkflowInputSchema),z.lazy(() => TaskCreateOrConnectWithoutWorkflowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyWorkflowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutWorkflowNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutWorkflowNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutWorkflowInputSchema),z.lazy(() => TaskCreateWithoutWorkflowInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutWorkflowInputSchema),z.lazy(() => TaskUncheckedCreateWithoutWorkflowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutWorkflowInputSchema),z.lazy(() => TaskCreateOrConnectWithoutWorkflowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutWorkflowInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutWorkflowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyWorkflowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutWorkflowInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutWorkflowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutWorkflowInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutWorkflowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutWorkflowNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutWorkflowNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutWorkflowInputSchema),z.lazy(() => TaskCreateWithoutWorkflowInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutWorkflowInputSchema),z.lazy(() => TaskUncheckedCreateWithoutWorkflowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutWorkflowInputSchema),z.lazy(() => TaskCreateOrConnectWithoutWorkflowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutWorkflowInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutWorkflowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyWorkflowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutWorkflowInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutWorkflowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutWorkflowInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutWorkflowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkflowCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.WorkflowCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => WorkflowCreateWithoutTasksInputSchema),z.lazy(() => WorkflowUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkflowCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => WorkflowWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DocumentCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.DocumentCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutTasksInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional()
}).strict();

export const AuditLogCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.AuditLogCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutTaskInputSchema),z.lazy(() => AuditLogCreateWithoutTaskInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutTaskInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutTaskInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuditLogUncheckedCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.AuditLogUncheckedCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutTaskInputSchema),z.lazy(() => AuditLogCreateWithoutTaskInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutTaskInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutTaskInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkflowUpdateOneRequiredWithoutTasksNestedInputSchema: z.ZodType<Prisma.WorkflowUpdateOneRequiredWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkflowCreateWithoutTasksInputSchema),z.lazy(() => WorkflowUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkflowCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => WorkflowUpsertWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => WorkflowWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkflowUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => WorkflowUpdateWithoutTasksInputSchema),z.lazy(() => WorkflowUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTasksInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const DocumentUpdateOneWithoutTasksNestedInputSchema: z.ZodType<Prisma.DocumentUpdateOneWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutTasksInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => DocumentUpsertWithoutTasksInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => DocumentUpdateWithoutTasksInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const AuditLogUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.AuditLogUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutTaskInputSchema),z.lazy(() => AuditLogCreateWithoutTaskInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutTaskInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutTaskInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuditLogUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => AuditLogUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuditLogScalarWhereInputSchema),z.lazy(() => AuditLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuditLogUncheckedUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutTaskInputSchema),z.lazy(() => AuditLogCreateWithoutTaskInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutTaskInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutTaskInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuditLogUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => AuditLogUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuditLogScalarWhereInputSchema),z.lazy(() => AuditLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedOneWithoutAuditLogsInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutAuditLogsInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAuditLogsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAuditLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutAuditLogsInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuditLogsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuditLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TaskUpdateOneRequiredWithoutAuditLogsNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutAuditLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutAuditLogsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAuditLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutAuditLogsInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutAuditLogsInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutAuditLogsInputSchema),z.lazy(() => TaskUpdateWithoutAuditLogsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutAuditLogsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutAuditLogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuditLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuditLogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAuditLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAuditLogsInputSchema),z.lazy(() => UserUpdateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuditLogsInputSchema) ]).optional(),
}).strict();

export const DocumentCreateNestedOneWithoutSharedWithInputSchema: z.ZodType<Prisma.DocumentCreateNestedOneWithoutSharedWithInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutSharedWithInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutSharedWithInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutSharedWithInputSchema).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSharedDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSharedDocumentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSharedDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSharedDocumentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DocumentUpdateOneRequiredWithoutSharedWithNestedInputSchema: z.ZodType<Prisma.DocumentUpdateOneRequiredWithoutSharedWithNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutSharedWithInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutSharedWithInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutSharedWithInputSchema).optional(),
  upsert: z.lazy(() => DocumentUpsertWithoutSharedWithInputSchema).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateToOneWithWhereWithoutSharedWithInputSchema),z.lazy(() => DocumentUpdateWithoutSharedWithInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutSharedWithInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSharedDocumentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSharedDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSharedDocumentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSharedDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSharedDocumentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSharedDocumentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSharedDocumentsInputSchema),z.lazy(() => UserUpdateWithoutSharedDocumentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSharedDocumentsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCertificatesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCertificatesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCertificatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCertificatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCertificatesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutCertificatesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCertificatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCertificatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCertificatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCertificatesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCertificatesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCertificatesInputSchema),z.lazy(() => UserUpdateWithoutCertificatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCertificatesInputSchema) ]).optional(),
}).strict();

export const DocumentCreateNestedOneWithoutFileMetadataInputSchema: z.ZodType<Prisma.DocumentCreateNestedOneWithoutFileMetadataInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutFileMetadataInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutFileMetadataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutFileMetadataInputSchema).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional()
}).strict();

export const DocumentUpdateOneRequiredWithoutFileMetadataNestedInputSchema: z.ZodType<Prisma.DocumentUpdateOneRequiredWithoutFileMetadataNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutFileMetadataInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutFileMetadataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutFileMetadataInputSchema).optional(),
  upsert: z.lazy(() => DocumentUpsertWithoutFileMetadataInputSchema).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateToOneWithWhereWithoutFileMetadataInputSchema),z.lazy(() => DocumentUpdateWithoutFileMetadataInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutFileMetadataInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_password_resetCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_password_resetUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_password_resetCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_password_resetUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_password_resetUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_password_resetCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_password_resetUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_password_resetUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_password_resetScalarWhereInputSchema),z.lazy(() => back3nd_password_resetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_password_resetUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_password_resetUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_password_resetCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_password_resetUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_password_resetUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_password_resetScalarWhereInputSchema),z.lazy(() => back3nd_password_resetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_roleCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_roleCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => back3nd_roleWhereUniqueInputSchema).optional()
}).strict();

export const back3nd_userCreateNestedOneWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userCreateNestedOneWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_userCreateOrConnectWithoutRolesInputSchema).optional(),
  connect: z.lazy(() => back3nd_userWhereUniqueInputSchema).optional()
}).strict();

export const back3nd_roleUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.back3nd_roleUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_roleCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => back3nd_roleUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => back3nd_roleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_roleUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => back3nd_roleUpdateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const back3nd_userUpdateOneRequiredWithoutRolesNestedInputSchema: z.ZodType<Prisma.back3nd_userUpdateOneRequiredWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_userCreateOrConnectWithoutRolesInputSchema).optional(),
  upsert: z.lazy(() => back3nd_userUpsertWithoutRolesInputSchema).optional(),
  connect: z.lazy(() => back3nd_userWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_userUpdateToOneWithWhereWithoutRolesInputSchema),z.lazy(() => back3nd_userUpdateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutRolesInputSchema) ]).optional(),
}).strict();

export const back3nd_roleCreateNestedOneWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleCreateNestedOneWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutPermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_roleCreateOrConnectWithoutPermissionsInputSchema).optional(),
  connect: z.lazy(() => back3nd_roleWhereUniqueInputSchema).optional()
}).strict();

export const back3nd_entityCreateNestedOneWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityCreateNestedOneWithoutBack3nd_permissionInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_permissionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_entityCreateOrConnectWithoutBack3nd_permissionInputSchema).optional(),
  connect: z.lazy(() => back3nd_entityWhereUniqueInputSchema).optional()
}).strict();

export const back3nd_roleUpdateOneRequiredWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.back3nd_roleUpdateOneRequiredWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutPermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_roleCreateOrConnectWithoutPermissionsInputSchema).optional(),
  upsert: z.lazy(() => back3nd_roleUpsertWithoutPermissionsInputSchema).optional(),
  connect: z.lazy(() => back3nd_roleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_roleUpdateToOneWithWhereWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUpdateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutPermissionsInputSchema) ]).optional(),
}).strict();

export const back3nd_entityUpdateOneRequiredWithoutBack3nd_permissionNestedInputSchema: z.ZodType<Prisma.back3nd_entityUpdateOneRequiredWithoutBack3nd_permissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_permissionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_entityCreateOrConnectWithoutBack3nd_permissionInputSchema).optional(),
  upsert: z.lazy(() => back3nd_entityUpsertWithoutBack3nd_permissionInputSchema).optional(),
  connect: z.lazy(() => back3nd_entityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_entityUpdateToOneWithWhereWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUpdateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_permissionInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsCreateNestedManyWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateNestedManyWithoutBack3nd_entityInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema).array(),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionCreateNestedManyWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionCreateNestedManyWithoutTableInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyTableInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_entity_fieldsUncheckedCreateNestedManyWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedCreateNestedManyWithoutBack3nd_entityInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema).array(),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUncheckedCreateNestedManyWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateNestedManyWithoutTableInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyTableInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_entity_fieldsUpdateManyWithoutBack3nd_entityNestedInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateManyWithoutBack3nd_entityNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema).array(),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUpdateManyWithoutTableNestedInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyWithoutTableNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyTableInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutTableInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutTableInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityNestedInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema).array(),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyWithoutTableNestedInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyWithoutTableNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyTableInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutTableInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutTableInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_entityCreateNestedOneWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityCreateNestedOneWithoutBack3nd_entity_fieldsInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_entityCreateOrConnectWithoutBack3nd_entity_fieldsInputSchema).optional(),
  connect: z.lazy(() => back3nd_entityWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const back3nd_entityUpdateOneRequiredWithoutBack3nd_entity_fieldsNestedInputSchema: z.ZodType<Prisma.back3nd_entityUpdateOneRequiredWithoutBack3nd_entity_fieldsNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_entityCreateOrConnectWithoutBack3nd_entity_fieldsInputSchema).optional(),
  upsert: z.lazy(() => back3nd_entityUpsertWithoutBack3nd_entity_fieldsInputSchema).optional(),
  connect: z.lazy(() => back3nd_entityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_entityUpdateToOneWithWhereWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUpdateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_entity_fieldsInputSchema) ]).optional(),
}).strict();

export const back3nd_userCreateNestedOneWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userCreateNestedOneWithoutBack3nd_password_resetInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutBack3nd_password_resetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_userCreateOrConnectWithoutBack3nd_password_resetInputSchema).optional(),
  connect: z.lazy(() => back3nd_userWhereUniqueInputSchema).optional()
}).strict();

export const back3nd_userUpdateOneRequiredWithoutBack3nd_password_resetNestedInputSchema: z.ZodType<Prisma.back3nd_userUpdateOneRequiredWithoutBack3nd_password_resetNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutBack3nd_password_resetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_userCreateOrConnectWithoutBack3nd_password_resetInputSchema).optional(),
  upsert: z.lazy(() => back3nd_userUpsertWithoutBack3nd_password_resetInputSchema).optional(),
  connect: z.lazy(() => back3nd_userWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_userUpdateToOneWithWhereWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUpdateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutBack3nd_password_resetInputSchema) ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DocumentCreateWithoutOwnerInputSchema: z.ZodType<Prisma.DocumentCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sharedWith: z.lazy(() => SharedDocumentCreateNestedManyWithoutDocumentInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionCreateNestedManyWithoutDocumentInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutDocumentInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataCreateNestedOneWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sharedWith: z.lazy(() => SharedDocumentUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUncheckedCreateNestedOneWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutOwnerInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const DocumentCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.DocumentCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DocumentCreateManyOwnerInputSchema),z.lazy(() => DocumentCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SharedDocumentCreateWithoutSharedWithInputSchema: z.ZodType<Prisma.SharedDocumentCreateWithoutSharedWithInput> = z.object({
  id: z.string().optional(),
  sharedAt: z.coerce.date().optional(),
  document: z.lazy(() => DocumentCreateNestedOneWithoutSharedWithInputSchema)
}).strict();

export const SharedDocumentUncheckedCreateWithoutSharedWithInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedCreateWithoutSharedWithInput> = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  sharedAt: z.coerce.date().optional()
}).strict();

export const SharedDocumentCreateOrConnectWithoutSharedWithInputSchema: z.ZodType<Prisma.SharedDocumentCreateOrConnectWithoutSharedWithInput> = z.object({
  where: z.lazy(() => SharedDocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutSharedWithInputSchema) ]),
}).strict();

export const SharedDocumentCreateManySharedWithInputEnvelopeSchema: z.ZodType<Prisma.SharedDocumentCreateManySharedWithInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SharedDocumentCreateManySharedWithInputSchema),z.lazy(() => SharedDocumentCreateManySharedWithInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DigitalCertificateCreateWithoutUserInputSchema: z.ZodType<Prisma.DigitalCertificateCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  filePath: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const DigitalCertificateUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.DigitalCertificateUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  filePath: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const DigitalCertificateCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.DigitalCertificateCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => DigitalCertificateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DigitalCertificateCreateWithoutUserInputSchema),z.lazy(() => DigitalCertificateUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const DigitalCertificateCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.DigitalCertificateCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DigitalCertificateCreateManyUserInputSchema),z.lazy(() => DigitalCertificateCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskCreateWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskCreateWithoutAssignedToInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workflow: z.lazy(() => WorkflowCreateNestedOneWithoutTasksInputSchema),
  document: z.lazy(() => DocumentCreateNestedOneWithoutTasksInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutAssignedToInput> = z.object({
  id: z.string().optional(),
  workflowId: z.string(),
  documentId: z.string().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutAssignedToInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema) ]),
}).strict();

export const TaskCreateManyAssignedToInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyAssignedToInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyAssignedToInputSchema),z.lazy(() => TaskCreateManyAssignedToInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DocumentVersionCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionCreateWithoutCreatedByInput> = z.object({
  id: z.string().optional(),
  versionNumber: z.number().int(),
  filePath: z.string(),
  changesDescription: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  document: z.lazy(() => DocumentCreateNestedOneWithoutVersionsInputSchema)
}).strict();

export const DocumentVersionUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  versionNumber: z.number().int(),
  filePath: z.string(),
  changesDescription: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const DocumentVersionCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => DocumentVersionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const DocumentVersionCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.DocumentVersionCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DocumentVersionCreateManyCreatedByInputSchema),z.lazy(() => DocumentVersionCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AuditLogCreateWithoutPerformedByInputSchema: z.ZodType<Prisma.AuditLogCreateWithoutPerformedByInput> = z.object({
  id: z.string().optional(),
  action: z.string(),
  timestamp: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  task: z.lazy(() => TaskCreateNestedOneWithoutAuditLogsInputSchema)
}).strict();

export const AuditLogUncheckedCreateWithoutPerformedByInputSchema: z.ZodType<Prisma.AuditLogUncheckedCreateWithoutPerformedByInput> = z.object({
  id: z.string().optional(),
  taskId: z.string(),
  action: z.string(),
  timestamp: z.coerce.date().optional(),
  description: z.string().optional().nullable()
}).strict();

export const AuditLogCreateOrConnectWithoutPerformedByInputSchema: z.ZodType<Prisma.AuditLogCreateOrConnectWithoutPerformedByInput> = z.object({
  where: z.lazy(() => AuditLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuditLogCreateWithoutPerformedByInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutPerformedByInputSchema) ]),
}).strict();

export const AuditLogCreateManyPerformedByInputEnvelopeSchema: z.ZodType<Prisma.AuditLogCreateManyPerformedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AuditLogCreateManyPerformedByInputSchema),z.lazy(() => AuditLogCreateManyPerformedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DocumentUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.DocumentUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentUpdateWithoutOwnerInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutOwnerInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const DocumentUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.DocumentUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutOwnerInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const DocumentUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => DocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateManyMutationInputSchema),z.lazy(() => DocumentUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict();

export const DocumentScalarWhereInputSchema: z.ZodType<Prisma.DocumentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  filePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mimeType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  keywords: z.lazy(() => StringNullableListFilterSchema).optional(),
  ocrText: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  signed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  signedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  signature: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SharedDocumentUpsertWithWhereUniqueWithoutSharedWithInputSchema: z.ZodType<Prisma.SharedDocumentUpsertWithWhereUniqueWithoutSharedWithInput> = z.object({
  where: z.lazy(() => SharedDocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SharedDocumentUpdateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUncheckedUpdateWithoutSharedWithInputSchema) ]),
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutSharedWithInputSchema) ]),
}).strict();

export const SharedDocumentUpdateWithWhereUniqueWithoutSharedWithInputSchema: z.ZodType<Prisma.SharedDocumentUpdateWithWhereUniqueWithoutSharedWithInput> = z.object({
  where: z.lazy(() => SharedDocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SharedDocumentUpdateWithoutSharedWithInputSchema),z.lazy(() => SharedDocumentUncheckedUpdateWithoutSharedWithInputSchema) ]),
}).strict();

export const SharedDocumentUpdateManyWithWhereWithoutSharedWithInputSchema: z.ZodType<Prisma.SharedDocumentUpdateManyWithWhereWithoutSharedWithInput> = z.object({
  where: z.lazy(() => SharedDocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SharedDocumentUpdateManyMutationInputSchema),z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutSharedWithInputSchema) ]),
}).strict();

export const SharedDocumentScalarWhereInputSchema: z.ZodType<Prisma.SharedDocumentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SharedDocumentScalarWhereInputSchema),z.lazy(() => SharedDocumentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SharedDocumentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SharedDocumentScalarWhereInputSchema),z.lazy(() => SharedDocumentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  documentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  sharedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DigitalCertificateUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DigitalCertificateUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => DigitalCertificateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DigitalCertificateUpdateWithoutUserInputSchema),z.lazy(() => DigitalCertificateUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => DigitalCertificateCreateWithoutUserInputSchema),z.lazy(() => DigitalCertificateUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const DigitalCertificateUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DigitalCertificateUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => DigitalCertificateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DigitalCertificateUpdateWithoutUserInputSchema),z.lazy(() => DigitalCertificateUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const DigitalCertificateUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.DigitalCertificateUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => DigitalCertificateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DigitalCertificateUpdateManyMutationInputSchema),z.lazy(() => DigitalCertificateUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const DigitalCertificateScalarWhereInputSchema: z.ZodType<Prisma.DigitalCertificateScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DigitalCertificateScalarWhereInputSchema),z.lazy(() => DigitalCertificateScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DigitalCertificateScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DigitalCertificateScalarWhereInputSchema),z.lazy(() => DigitalCertificateScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  filePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutAssignedToInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutAssignedToInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAssignedToInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutAssignedToInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutAssignedToInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutAssignedToInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutAssignedToInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutAssignedToInputSchema) ]),
}).strict();

export const TaskScalarWhereInputSchema: z.ZodType<Prisma.TaskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  workflowId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  assignedToId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  documentId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DocumentVersionUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => DocumentVersionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentVersionUpdateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const DocumentVersionUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => DocumentVersionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentVersionUpdateWithoutCreatedByInputSchema),z.lazy(() => DocumentVersionUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const DocumentVersionUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => DocumentVersionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentVersionUpdateManyMutationInputSchema),z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict();

export const DocumentVersionScalarWhereInputSchema: z.ZodType<Prisma.DocumentVersionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentVersionScalarWhereInputSchema),z.lazy(() => DocumentVersionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentVersionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentVersionScalarWhereInputSchema),z.lazy(() => DocumentVersionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  documentId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  versionNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  filePath: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  changesDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdById: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AuditLogUpsertWithWhereUniqueWithoutPerformedByInputSchema: z.ZodType<Prisma.AuditLogUpsertWithWhereUniqueWithoutPerformedByInput> = z.object({
  where: z.lazy(() => AuditLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AuditLogUpdateWithoutPerformedByInputSchema),z.lazy(() => AuditLogUncheckedUpdateWithoutPerformedByInputSchema) ]),
  create: z.union([ z.lazy(() => AuditLogCreateWithoutPerformedByInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutPerformedByInputSchema) ]),
}).strict();

export const AuditLogUpdateWithWhereUniqueWithoutPerformedByInputSchema: z.ZodType<Prisma.AuditLogUpdateWithWhereUniqueWithoutPerformedByInput> = z.object({
  where: z.lazy(() => AuditLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AuditLogUpdateWithoutPerformedByInputSchema),z.lazy(() => AuditLogUncheckedUpdateWithoutPerformedByInputSchema) ]),
}).strict();

export const AuditLogUpdateManyWithWhereWithoutPerformedByInputSchema: z.ZodType<Prisma.AuditLogUpdateManyWithWhereWithoutPerformedByInput> = z.object({
  where: z.lazy(() => AuditLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AuditLogUpdateManyMutationInputSchema),z.lazy(() => AuditLogUncheckedUpdateManyWithoutPerformedByInputSchema) ]),
}).strict();

export const AuditLogScalarWhereInputSchema: z.ZodType<Prisma.AuditLogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuditLogScalarWhereInputSchema),z.lazy(() => AuditLogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogScalarWhereInputSchema),z.lazy(() => AuditLogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  performedById: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateWithoutDocumentsInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sharedDocuments: z.lazy(() => SharedDocumentCreateNestedManyWithoutSharedWithInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutAssignedToInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDocumentsInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedCreateNestedManyWithoutSharedWithInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAssignedToInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDocumentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]),
}).strict();

export const SharedDocumentCreateWithoutDocumentInputSchema: z.ZodType<Prisma.SharedDocumentCreateWithoutDocumentInput> = z.object({
  id: z.string().optional(),
  sharedAt: z.coerce.date().optional(),
  sharedWith: z.lazy(() => UserCreateNestedOneWithoutSharedDocumentsInputSchema)
}).strict();

export const SharedDocumentUncheckedCreateWithoutDocumentInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedCreateWithoutDocumentInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  sharedAt: z.coerce.date().optional()
}).strict();

export const SharedDocumentCreateOrConnectWithoutDocumentInputSchema: z.ZodType<Prisma.SharedDocumentCreateOrConnectWithoutDocumentInput> = z.object({
  where: z.lazy(() => SharedDocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutDocumentInputSchema) ]),
}).strict();

export const SharedDocumentCreateManyDocumentInputEnvelopeSchema: z.ZodType<Prisma.SharedDocumentCreateManyDocumentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SharedDocumentCreateManyDocumentInputSchema),z.lazy(() => SharedDocumentCreateManyDocumentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DocumentVersionCreateWithoutDocumentInputSchema: z.ZodType<Prisma.DocumentVersionCreateWithoutDocumentInput> = z.object({
  id: z.string().optional(),
  versionNumber: z.number().int(),
  filePath: z.string(),
  changesDescription: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutCreatedVersionsInputSchema)
}).strict();

export const DocumentVersionUncheckedCreateWithoutDocumentInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedCreateWithoutDocumentInput> = z.object({
  id: z.string().optional(),
  versionNumber: z.number().int(),
  filePath: z.string(),
  changesDescription: z.string().optional().nullable(),
  createdById: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const DocumentVersionCreateOrConnectWithoutDocumentInputSchema: z.ZodType<Prisma.DocumentVersionCreateOrConnectWithoutDocumentInput> = z.object({
  where: z.lazy(() => DocumentVersionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutDocumentInputSchema) ]),
}).strict();

export const DocumentVersionCreateManyDocumentInputEnvelopeSchema: z.ZodType<Prisma.DocumentVersionCreateManyDocumentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DocumentVersionCreateManyDocumentInputSchema),z.lazy(() => DocumentVersionCreateManyDocumentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskCreateWithoutDocumentInputSchema: z.ZodType<Prisma.TaskCreateWithoutDocumentInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workflow: z.lazy(() => WorkflowCreateNestedOneWithoutTasksInputSchema),
  assignedTo: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutDocumentInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutDocumentInput> = z.object({
  id: z.string().optional(),
  workflowId: z.string(),
  assignedToId: z.string().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutDocumentInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutDocumentInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutDocumentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDocumentInputSchema) ]),
}).strict();

export const TaskCreateManyDocumentInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyDocumentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyDocumentInputSchema),z.lazy(() => TaskCreateManyDocumentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FileMetadataCreateWithoutDocumentInputSchema: z.ZodType<Prisma.FileMetadataCreateWithoutDocumentInput> = z.object({
  id: z.string().optional(),
  fileSize: z.number().int(),
  mimeType: z.string(),
  checksum: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FileMetadataUncheckedCreateWithoutDocumentInputSchema: z.ZodType<Prisma.FileMetadataUncheckedCreateWithoutDocumentInput> = z.object({
  id: z.string().optional(),
  fileSize: z.number().int(),
  mimeType: z.string(),
  checksum: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FileMetadataCreateOrConnectWithoutDocumentInputSchema: z.ZodType<Prisma.FileMetadataCreateOrConnectWithoutDocumentInput> = z.object({
  where: z.lazy(() => FileMetadataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FileMetadataCreateWithoutDocumentInputSchema),z.lazy(() => FileMetadataUncheckedCreateWithoutDocumentInputSchema) ]),
}).strict();

export const UserUpsertWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutDocumentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutDocumentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDocumentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDocumentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutDocumentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDocumentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const SharedDocumentUpsertWithWhereUniqueWithoutDocumentInputSchema: z.ZodType<Prisma.SharedDocumentUpsertWithWhereUniqueWithoutDocumentInput> = z.object({
  where: z.lazy(() => SharedDocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SharedDocumentUpdateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUncheckedUpdateWithoutDocumentInputSchema) ]),
  create: z.union([ z.lazy(() => SharedDocumentCreateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUncheckedCreateWithoutDocumentInputSchema) ]),
}).strict();

export const SharedDocumentUpdateWithWhereUniqueWithoutDocumentInputSchema: z.ZodType<Prisma.SharedDocumentUpdateWithWhereUniqueWithoutDocumentInput> = z.object({
  where: z.lazy(() => SharedDocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SharedDocumentUpdateWithoutDocumentInputSchema),z.lazy(() => SharedDocumentUncheckedUpdateWithoutDocumentInputSchema) ]),
}).strict();

export const SharedDocumentUpdateManyWithWhereWithoutDocumentInputSchema: z.ZodType<Prisma.SharedDocumentUpdateManyWithWhereWithoutDocumentInput> = z.object({
  where: z.lazy(() => SharedDocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SharedDocumentUpdateManyMutationInputSchema),z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutDocumentInputSchema) ]),
}).strict();

export const DocumentVersionUpsertWithWhereUniqueWithoutDocumentInputSchema: z.ZodType<Prisma.DocumentVersionUpsertWithWhereUniqueWithoutDocumentInput> = z.object({
  where: z.lazy(() => DocumentVersionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentVersionUpdateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUncheckedUpdateWithoutDocumentInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentVersionCreateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUncheckedCreateWithoutDocumentInputSchema) ]),
}).strict();

export const DocumentVersionUpdateWithWhereUniqueWithoutDocumentInputSchema: z.ZodType<Prisma.DocumentVersionUpdateWithWhereUniqueWithoutDocumentInput> = z.object({
  where: z.lazy(() => DocumentVersionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentVersionUpdateWithoutDocumentInputSchema),z.lazy(() => DocumentVersionUncheckedUpdateWithoutDocumentInputSchema) ]),
}).strict();

export const DocumentVersionUpdateManyWithWhereWithoutDocumentInputSchema: z.ZodType<Prisma.DocumentVersionUpdateManyWithWhereWithoutDocumentInput> = z.object({
  where: z.lazy(() => DocumentVersionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentVersionUpdateManyMutationInputSchema),z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutDocumentInputSchema) ]),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutDocumentInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutDocumentInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutDocumentInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutDocumentInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutDocumentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutDocumentInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutDocumentInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutDocumentInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutDocumentInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutDocumentInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutDocumentInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutDocumentInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutDocumentInputSchema) ]),
}).strict();

export const FileMetadataUpsertWithoutDocumentInputSchema: z.ZodType<Prisma.FileMetadataUpsertWithoutDocumentInput> = z.object({
  update: z.union([ z.lazy(() => FileMetadataUpdateWithoutDocumentInputSchema),z.lazy(() => FileMetadataUncheckedUpdateWithoutDocumentInputSchema) ]),
  create: z.union([ z.lazy(() => FileMetadataCreateWithoutDocumentInputSchema),z.lazy(() => FileMetadataUncheckedCreateWithoutDocumentInputSchema) ]),
  where: z.lazy(() => FileMetadataWhereInputSchema).optional()
}).strict();

export const FileMetadataUpdateToOneWithWhereWithoutDocumentInputSchema: z.ZodType<Prisma.FileMetadataUpdateToOneWithWhereWithoutDocumentInput> = z.object({
  where: z.lazy(() => FileMetadataWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FileMetadataUpdateWithoutDocumentInputSchema),z.lazy(() => FileMetadataUncheckedUpdateWithoutDocumentInputSchema) ]),
}).strict();

export const FileMetadataUpdateWithoutDocumentInputSchema: z.ZodType<Prisma.FileMetadataUpdateWithoutDocumentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileSize: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checksum: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileMetadataUncheckedUpdateWithoutDocumentInputSchema: z.ZodType<Prisma.FileMetadataUncheckedUpdateWithoutDocumentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fileSize: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  checksum: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentCreateWithoutVersionsInputSchema: z.ZodType<Prisma.DocumentCreateWithoutVersionsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
  sharedWith: z.lazy(() => SharedDocumentCreateNestedManyWithoutDocumentInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutDocumentInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataCreateNestedOneWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateWithoutVersionsInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutVersionsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  ownerId: z.string(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sharedWith: z.lazy(() => SharedDocumentUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUncheckedCreateNestedOneWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentCreateOrConnectWithoutVersionsInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutVersionsInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutVersionsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutVersionsInputSchema) ]),
}).strict();

export const UserCreateWithoutCreatedVersionsInputSchema: z.ZodType<Prisma.UserCreateWithoutCreatedVersionsInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutOwnerInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentCreateNestedManyWithoutSharedWithInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutAssignedToInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCreatedVersionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCreatedVersionsInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedCreateNestedManyWithoutSharedWithInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAssignedToInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCreatedVersionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedVersionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedVersionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedVersionsInputSchema) ]),
}).strict();

export const DocumentUpsertWithoutVersionsInputSchema: z.ZodType<Prisma.DocumentUpsertWithoutVersionsInput> = z.object({
  update: z.union([ z.lazy(() => DocumentUpdateWithoutVersionsInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutVersionsInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutVersionsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutVersionsInputSchema) ]),
  where: z.lazy(() => DocumentWhereInputSchema).optional()
}).strict();

export const DocumentUpdateToOneWithWhereWithoutVersionsInputSchema: z.ZodType<Prisma.DocumentUpdateToOneWithWhereWithoutVersionsInput> = z.object({
  where: z.lazy(() => DocumentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutVersionsInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutVersionsInputSchema) ]),
}).strict();

export const DocumentUpdateWithoutVersionsInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutVersionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
  sharedWith: z.lazy(() => SharedDocumentUpdateManyWithoutDocumentNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutDocumentNestedInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUpdateOneWithoutDocumentNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateWithoutVersionsInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutVersionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sharedWith: z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUncheckedUpdateOneWithoutDocumentNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutCreatedVersionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedVersionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCreatedVersionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedVersionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedVersionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedVersionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCreatedVersionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedVersionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCreatedVersionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedVersionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCreatedVersionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCreatedVersionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCreatedVersionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCreatedVersionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const TaskCreateWithoutWorkflowInputSchema: z.ZodType<Prisma.TaskCreateWithoutWorkflowInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  assignedTo: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  document: z.lazy(() => DocumentCreateNestedOneWithoutTasksInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutWorkflowInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutWorkflowInput> = z.object({
  id: z.string().optional(),
  assignedToId: z.string().optional().nullable(),
  documentId: z.string().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutWorkflowInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutWorkflowInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutWorkflowInputSchema),z.lazy(() => TaskUncheckedCreateWithoutWorkflowInputSchema) ]),
}).strict();

export const TaskCreateManyWorkflowInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyWorkflowInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyWorkflowInputSchema),z.lazy(() => TaskCreateManyWorkflowInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskUpsertWithWhereUniqueWithoutWorkflowInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutWorkflowInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutWorkflowInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutWorkflowInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutWorkflowInputSchema),z.lazy(() => TaskUncheckedCreateWithoutWorkflowInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutWorkflowInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutWorkflowInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutWorkflowInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutWorkflowInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutWorkflowInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutWorkflowInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutWorkflowInputSchema) ]),
}).strict();

export const WorkflowCreateWithoutTasksInputSchema: z.ZodType<Prisma.WorkflowCreateWithoutTasksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const WorkflowUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.WorkflowUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const WorkflowCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.WorkflowCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => WorkflowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkflowCreateWithoutTasksInputSchema),z.lazy(() => WorkflowUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const UserCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateWithoutTasksInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutOwnerInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentCreateNestedManyWithoutSharedWithInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateCreateNestedManyWithoutUserInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedCreateNestedManyWithoutSharedWithInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const DocumentCreateWithoutTasksInputSchema: z.ZodType<Prisma.DocumentCreateWithoutTasksInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
  sharedWith: z.lazy(() => SharedDocumentCreateNestedManyWithoutDocumentInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionCreateNestedManyWithoutDocumentInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataCreateNestedOneWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  ownerId: z.string(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sharedWith: z.lazy(() => SharedDocumentUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUncheckedCreateNestedOneWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutTasksInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const AuditLogCreateWithoutTaskInputSchema: z.ZodType<Prisma.AuditLogCreateWithoutTaskInput> = z.object({
  id: z.string().optional(),
  action: z.string(),
  timestamp: z.coerce.date().optional(),
  description: z.string().optional().nullable(),
  performedBy: z.lazy(() => UserCreateNestedOneWithoutAuditLogsInputSchema)
}).strict();

export const AuditLogUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.AuditLogUncheckedCreateWithoutTaskInput> = z.object({
  id: z.string().optional(),
  action: z.string(),
  performedById: z.string(),
  timestamp: z.coerce.date().optional(),
  description: z.string().optional().nullable()
}).strict();

export const AuditLogCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.AuditLogCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => AuditLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuditLogCreateWithoutTaskInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const AuditLogCreateManyTaskInputEnvelopeSchema: z.ZodType<Prisma.AuditLogCreateManyTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AuditLogCreateManyTaskInputSchema),z.lazy(() => AuditLogCreateManyTaskInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const WorkflowUpsertWithoutTasksInputSchema: z.ZodType<Prisma.WorkflowUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => WorkflowUpdateWithoutTasksInputSchema),z.lazy(() => WorkflowUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => WorkflowCreateWithoutTasksInputSchema),z.lazy(() => WorkflowUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => WorkflowWhereInputSchema).optional()
}).strict();

export const WorkflowUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.WorkflowUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => WorkflowWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkflowUpdateWithoutTasksInputSchema),z.lazy(() => WorkflowUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const WorkflowUpdateWithoutTasksInputSchema: z.ZodType<Prisma.WorkflowUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkflowUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.WorkflowUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const UserUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUpdateManyWithoutUserNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const DocumentUpsertWithoutTasksInputSchema: z.ZodType<Prisma.DocumentUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => DocumentUpdateWithoutTasksInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutTasksInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => DocumentWhereInputSchema).optional()
}).strict();

export const DocumentUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.DocumentUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => DocumentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutTasksInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const DocumentUpdateWithoutTasksInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
  sharedWith: z.lazy(() => SharedDocumentUpdateManyWithoutDocumentNestedInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUpdateManyWithoutDocumentNestedInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUpdateOneWithoutDocumentNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sharedWith: z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUncheckedUpdateOneWithoutDocumentNestedInputSchema).optional()
}).strict();

export const AuditLogUpsertWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.AuditLogUpsertWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => AuditLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AuditLogUpdateWithoutTaskInputSchema),z.lazy(() => AuditLogUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => AuditLogCreateWithoutTaskInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const AuditLogUpdateWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.AuditLogUpdateWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => AuditLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AuditLogUpdateWithoutTaskInputSchema),z.lazy(() => AuditLogUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export const AuditLogUpdateManyWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.AuditLogUpdateManyWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => AuditLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AuditLogUpdateManyMutationInputSchema),z.lazy(() => AuditLogUncheckedUpdateManyWithoutTaskInputSchema) ]),
}).strict();

export const TaskCreateWithoutAuditLogsInputSchema: z.ZodType<Prisma.TaskCreateWithoutAuditLogsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workflow: z.lazy(() => WorkflowCreateNestedOneWithoutTasksInputSchema),
  assignedTo: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema).optional(),
  document: z.lazy(() => DocumentCreateNestedOneWithoutTasksInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutAuditLogsInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutAuditLogsInput> = z.object({
  id: z.string().optional(),
  workflowId: z.string(),
  assignedToId: z.string().optional().nullable(),
  documentId: z.string().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TaskCreateOrConnectWithoutAuditLogsInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutAuditLogsInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutAuditLogsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAuditLogsInputSchema) ]),
}).strict();

export const UserCreateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserCreateWithoutAuditLogsInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutOwnerInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentCreateNestedManyWithoutSharedWithInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutAssignedToInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuditLogsInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedCreateNestedManyWithoutSharedWithInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAssignedToInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuditLogsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]),
}).strict();

export const TaskUpsertWithoutAuditLogsInputSchema: z.ZodType<Prisma.TaskUpsertWithoutAuditLogsInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutAuditLogsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutAuditLogsInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutAuditLogsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutAuditLogsInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const TaskUpdateToOneWithWhereWithoutAuditLogsInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutAuditLogsInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutAuditLogsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutAuditLogsInputSchema) ]),
}).strict();

export const TaskUpdateWithoutAuditLogsInputSchema: z.ZodType<Prisma.TaskUpdateWithoutAuditLogsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workflow: z.lazy(() => WorkflowUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  assignedTo: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  document: z.lazy(() => DocumentUpdateOneWithoutTasksNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutAuditLogsInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutAuditLogsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workflowId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  documentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAuditLogsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuditLogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAuditLogsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuditLogsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAuditLogsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuditLogsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const DocumentCreateWithoutSharedWithInputSchema: z.ZodType<Prisma.DocumentCreateWithoutSharedWithInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
  versions: z.lazy(() => DocumentVersionCreateNestedManyWithoutDocumentInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutDocumentInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataCreateNestedOneWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateWithoutSharedWithInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutSharedWithInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  ownerId: z.string(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  versions: z.lazy(() => DocumentVersionUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUncheckedCreateNestedOneWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentCreateOrConnectWithoutSharedWithInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutSharedWithInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutSharedWithInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutSharedWithInputSchema) ]),
}).strict();

export const UserCreateWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.UserCreateWithoutSharedDocumentsInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutOwnerInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutAssignedToInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSharedDocumentsInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAssignedToInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSharedDocumentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSharedDocumentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSharedDocumentsInputSchema) ]),
}).strict();

export const DocumentUpsertWithoutSharedWithInputSchema: z.ZodType<Prisma.DocumentUpsertWithoutSharedWithInput> = z.object({
  update: z.union([ z.lazy(() => DocumentUpdateWithoutSharedWithInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutSharedWithInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutSharedWithInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutSharedWithInputSchema) ]),
  where: z.lazy(() => DocumentWhereInputSchema).optional()
}).strict();

export const DocumentUpdateToOneWithWhereWithoutSharedWithInputSchema: z.ZodType<Prisma.DocumentUpdateToOneWithWhereWithoutSharedWithInput> = z.object({
  where: z.lazy(() => DocumentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutSharedWithInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutSharedWithInputSchema) ]),
}).strict();

export const DocumentUpdateWithoutSharedWithInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutSharedWithInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUpdateManyWithoutDocumentNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutDocumentNestedInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUpdateOneWithoutDocumentNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateWithoutSharedWithInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutSharedWithInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  versions: z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUncheckedUpdateOneWithoutDocumentNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSharedDocumentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSharedDocumentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSharedDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSharedDocumentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSharedDocumentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSharedDocumentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSharedDocumentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSharedDocumentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSharedDocumentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSharedDocumentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  certificates: z.lazy(() => DigitalCertificateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutCertificatesInputSchema: z.ZodType<Prisma.UserCreateWithoutCertificatesInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutOwnerInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentCreateNestedManyWithoutSharedWithInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutAssignedToInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCertificatesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCertificatesInput> = z.object({
  id: z.string().optional(),
  apiUserId: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedCreateNestedManyWithoutSharedWithInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAssignedToInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutPerformedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCertificatesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCertificatesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCertificatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCertificatesInputSchema) ]),
}).strict();

export const UserUpsertWithoutCertificatesInputSchema: z.ZodType<Prisma.UserUpsertWithoutCertificatesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCertificatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCertificatesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCertificatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCertificatesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCertificatesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCertificatesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCertificatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCertificatesInputSchema) ]),
}).strict();

export const UserUpdateWithoutCertificatesInputSchema: z.ZodType<Prisma.UserUpdateWithoutCertificatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCertificatesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCertificatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apiUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutSharedWithNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutAssignedToNestedInputSchema).optional(),
  createdVersions: z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutPerformedByNestedInputSchema).optional()
}).strict();

export const DocumentCreateWithoutFileMetadataInputSchema: z.ZodType<Prisma.DocumentCreateWithoutFileMetadataInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
  sharedWith: z.lazy(() => SharedDocumentCreateNestedManyWithoutDocumentInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionCreateNestedManyWithoutDocumentInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateWithoutFileMetadataInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutFileMetadataInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  ownerId: z.string(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sharedWith: z.lazy(() => SharedDocumentUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentCreateOrConnectWithoutFileMetadataInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutFileMetadataInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutFileMetadataInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutFileMetadataInputSchema) ]),
}).strict();

export const DocumentUpsertWithoutFileMetadataInputSchema: z.ZodType<Prisma.DocumentUpsertWithoutFileMetadataInput> = z.object({
  update: z.union([ z.lazy(() => DocumentUpdateWithoutFileMetadataInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutFileMetadataInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutFileMetadataInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutFileMetadataInputSchema) ]),
  where: z.lazy(() => DocumentWhereInputSchema).optional()
}).strict();

export const DocumentUpdateToOneWithWhereWithoutFileMetadataInputSchema: z.ZodType<Prisma.DocumentUpdateToOneWithWhereWithoutFileMetadataInput> = z.object({
  where: z.lazy(() => DocumentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutFileMetadataInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutFileMetadataInputSchema) ]),
}).strict();

export const DocumentUpdateWithoutFileMetadataInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutFileMetadataInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
  sharedWith: z.lazy(() => SharedDocumentUpdateManyWithoutDocumentNestedInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUpdateManyWithoutDocumentNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutDocumentNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateWithoutFileMetadataInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutFileMetadataInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sharedWith: z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional()
}).strict();

export const back3nd_password_resetCreateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date()
}).strict();

export const back3nd_password_resetUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date()
}).strict();

export const back3nd_password_resetCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_password_resetCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.back3nd_password_resetCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_password_resetCreateManyUserInputSchema),z.lazy(() => back3nd_password_resetCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_user_roleCreateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  role: z.lazy(() => back3nd_roleCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const back3nd_user_roleUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_user_roleCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_user_roleCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_user_roleCreateManyUserInputSchema),z.lazy(() => back3nd_user_roleCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_password_resetUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_password_resetUpdateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_password_resetUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_password_resetUpdateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_password_resetUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_password_resetScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_password_resetUpdateManyMutationInputSchema),z.lazy(() => back3nd_password_resetUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const back3nd_password_resetScalarWhereInputSchema: z.ZodType<Prisma.back3nd_password_resetScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_password_resetScalarWhereInputSchema),z.lazy(() => back3nd_password_resetScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_password_resetScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_password_resetScalarWhereInputSchema),z.lazy(() => back3nd_password_resetScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_user_roleUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_user_roleUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_user_roleUpdateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_user_roleUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_user_roleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_user_roleUpdateManyMutationInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const back3nd_user_roleScalarWhereInputSchema: z.ZodType<Prisma.back3nd_user_roleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_permissionCreateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  table: z.lazy(() => back3nd_entityCreateNestedOneWithoutBack3nd_permissionInputSchema)
}).strict();

export const back3nd_permissionUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  table_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_permissionCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.back3nd_permissionCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_permissionCreateManyRoleInputSchema),z.lazy(() => back3nd_permissionCreateManyRoleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_user_roleCreateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => back3nd_userCreateNestedOneWithoutRolesInputSchema)
}).strict();

export const back3nd_user_roleUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_user_roleCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_user_roleCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_user_roleCreateManyRoleInputSchema),z.lazy(() => back3nd_user_roleCreateManyRoleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_permissionUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_permissionUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_permissionUpdateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_permissionUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_permissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_permissionUpdateManyMutationInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_permissionScalarWhereInputSchema: z.ZodType<Prisma.back3nd_permissionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_permissionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  can_create: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_user_roleUpdateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_user_roleUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_user_roleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_user_roleUpdateManyMutationInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_roleCreateWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  permissions: z.lazy(() => back3nd_permissionCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  permissions: z.lazy(() => back3nd_permissionUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => back3nd_roleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const back3nd_userCreateWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userCreateWithoutRolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userUncheckedCreateWithoutRolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => back3nd_userWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const back3nd_roleUpsertWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_roleUpdateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => back3nd_roleWhereInputSchema).optional()
}).strict();

export const back3nd_roleUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => back3nd_roleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_roleUpdateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const back3nd_roleUpdateWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => back3nd_permissionUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_userUpsertWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userUpsertWithoutRolesInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_userUpdateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutRolesInputSchema) ]),
  where: z.lazy(() => back3nd_userWhereInputSchema).optional()
}).strict();

export const back3nd_userUpdateToOneWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userUpdateToOneWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => back3nd_userWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_userUpdateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const back3nd_userUpdateWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userUpdateWithoutRolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const back3nd_userUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userUncheckedUpdateWithoutRolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const back3nd_roleCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleCreateWithoutPermissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users: z.lazy(() => back3nd_user_roleCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedCreateWithoutPermissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users: z.lazy(() => back3nd_user_roleUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => back3nd_roleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const back3nd_entityCreateWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityCreateWithoutBack3nd_permissionInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsCreateNestedManyWithoutBack3nd_entityInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedCreateWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedCreateWithoutBack3nd_permissionInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUncheckedCreateNestedManyWithoutBack3nd_entityInputSchema).optional()
}).strict();

export const back3nd_entityCreateOrConnectWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityCreateOrConnectWithoutBack3nd_permissionInput> = z.object({
  where: z.lazy(() => back3nd_entityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_permissionInputSchema) ]),
}).strict();

export const back3nd_roleUpsertWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleUpsertWithoutPermissionsInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_roleUpdateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutPermissionsInputSchema) ]),
  where: z.lazy(() => back3nd_roleWhereInputSchema).optional()
}).strict();

export const back3nd_roleUpdateToOneWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleUpdateToOneWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => back3nd_roleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_roleUpdateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export const back3nd_roleUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleUpdateWithoutPermissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => back3nd_user_roleUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedUpdateWithoutPermissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_entityUpsertWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityUpsertWithoutBack3nd_permissionInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_entityUpdateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_permissionInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_permissionInputSchema) ]),
  where: z.lazy(() => back3nd_entityWhereInputSchema).optional()
}).strict();

export const back3nd_entityUpdateToOneWithWhereWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityUpdateToOneWithWhereWithoutBack3nd_permissionInput> = z.object({
  where: z.lazy(() => back3nd_entityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_entityUpdateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_permissionInputSchema) ]),
}).strict();

export const back3nd_entityUpdateWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityUpdateWithoutBack3nd_permissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUpdateManyWithoutBack3nd_entityNestedInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedUpdateWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedUpdateWithoutBack3nd_permissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityNestedInputSchema).optional()
}).strict();

export const back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateWithoutBack3nd_entityInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInput> = z.object({
  where: z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema) ]),
}).strict();

export const back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelopeSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_permissionCreateWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionCreateWithoutTableInput> = z.object({
  id: z.string().optional(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  role: z.lazy(() => back3nd_roleCreateNestedOneWithoutPermissionsInputSchema)
}).strict();

export const back3nd_permissionUncheckedCreateWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateWithoutTableInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionCreateOrConnectWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionCreateOrConnectWithoutTableInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema) ]),
}).strict();

export const back3nd_permissionCreateManyTableInputEnvelopeSchema: z.ZodType<Prisma.back3nd_permissionCreateManyTableInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_permissionCreateManyTableInputSchema),z.lazy(() => back3nd_permissionCreateManyTableInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInput> = z.object({
  where: z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedUpdateWithoutBack3nd_entityInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema) ]),
}).strict();

export const back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInput> = z.object({
  where: z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedUpdateWithoutBack3nd_entityInputSchema) ]),
}).strict();

export const back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInput> = z.object({
  where: z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateManyMutationInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityInputSchema) ]),
}).strict();

export const back3nd_entity_fieldsScalarWhereInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  columnName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  columnType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  placeholder: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  defaultValue: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isUnique: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  entity_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_permissionUpsertWithWhereUniqueWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUpsertWithWhereUniqueWithoutTableInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateWithoutTableInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema) ]),
}).strict();

export const back3nd_permissionUpdateWithWhereUniqueWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateWithWhereUniqueWithoutTableInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_permissionUpdateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateWithoutTableInputSchema) ]),
}).strict();

export const back3nd_permissionUpdateManyWithWhereWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyWithWhereWithoutTableInput> = z.object({
  where: z.lazy(() => back3nd_permissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_permissionUpdateManyMutationInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutTableInputSchema) ]),
}).strict();

export const back3nd_entityCreateWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityCreateWithoutBack3nd_entity_fieldsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionCreateNestedManyWithoutTableInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUncheckedCreateNestedManyWithoutTableInputSchema).optional()
}).strict();

export const back3nd_entityCreateOrConnectWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityCreateOrConnectWithoutBack3nd_entity_fieldsInput> = z.object({
  where: z.lazy(() => back3nd_entityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInputSchema) ]),
}).strict();

export const back3nd_entityUpsertWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityUpsertWithoutBack3nd_entity_fieldsInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_entityUpdateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_entity_fieldsInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInputSchema) ]),
  where: z.lazy(() => back3nd_entityWhereInputSchema).optional()
}).strict();

export const back3nd_entityUpdateToOneWithWhereWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityUpdateToOneWithWhereWithoutBack3nd_entity_fieldsInput> = z.object({
  where: z.lazy(() => back3nd_entityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_entityUpdateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_entity_fieldsInputSchema) ]),
}).strict();

export const back3nd_entityUpdateWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityUpdateWithoutBack3nd_entity_fieldsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUpdateManyWithoutTableNestedInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedUpdateWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedUpdateWithoutBack3nd_entity_fieldsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutTableNestedInputSchema).optional()
}).strict();

export const back3nd_userCreateWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userCreateWithoutBack3nd_password_resetInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  roles: z.lazy(() => back3nd_user_roleCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userUncheckedCreateWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userUncheckedCreateWithoutBack3nd_password_resetInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  roles: z.lazy(() => back3nd_user_roleUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userCreateOrConnectWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userCreateOrConnectWithoutBack3nd_password_resetInput> = z.object({
  where: z.lazy(() => back3nd_userWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutBack3nd_password_resetInputSchema) ]),
}).strict();

export const back3nd_userUpsertWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userUpsertWithoutBack3nd_password_resetInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_userUpdateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutBack3nd_password_resetInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutBack3nd_password_resetInputSchema) ]),
  where: z.lazy(() => back3nd_userWhereInputSchema).optional()
}).strict();

export const back3nd_userUpdateToOneWithWhereWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userUpdateToOneWithWhereWithoutBack3nd_password_resetInput> = z.object({
  where: z.lazy(() => back3nd_userWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_userUpdateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutBack3nd_password_resetInputSchema) ]),
}).strict();

export const back3nd_userUpdateWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userUpdateWithoutBack3nd_password_resetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => back3nd_user_roleUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const back3nd_userUncheckedUpdateWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userUncheckedUpdateWithoutBack3nd_password_resetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const DocumentCreateManyOwnerInputSchema: z.ZodType<Prisma.DocumentCreateManyOwnerInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  filePath: z.string(),
  mimeType: z.string(),
  keywords: z.union([ z.lazy(() => DocumentCreatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.string().optional().nullable(),
  signed: z.boolean().optional(),
  signedAt: z.coerce.date().optional().nullable(),
  signature: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const SharedDocumentCreateManySharedWithInputSchema: z.ZodType<Prisma.SharedDocumentCreateManySharedWithInput> = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  sharedAt: z.coerce.date().optional()
}).strict();

export const DigitalCertificateCreateManyUserInputSchema: z.ZodType<Prisma.DigitalCertificateCreateManyUserInput> = z.object({
  id: z.string().optional(),
  filePath: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const TaskCreateManyAssignedToInputSchema: z.ZodType<Prisma.TaskCreateManyAssignedToInput> = z.object({
  id: z.string().optional(),
  workflowId: z.string(),
  documentId: z.string().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DocumentVersionCreateManyCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionCreateManyCreatedByInput> = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  versionNumber: z.number().int(),
  filePath: z.string(),
  changesDescription: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AuditLogCreateManyPerformedByInputSchema: z.ZodType<Prisma.AuditLogCreateManyPerformedByInput> = z.object({
  id: z.string().optional(),
  taskId: z.string(),
  action: z.string(),
  timestamp: z.coerce.date().optional(),
  description: z.string().optional().nullable()
}).strict();

export const DocumentUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sharedWith: z.lazy(() => SharedDocumentUpdateManyWithoutDocumentNestedInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUpdateManyWithoutDocumentNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutDocumentNestedInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUpdateOneWithoutDocumentNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sharedWith: z.lazy(() => SharedDocumentUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  versions: z.lazy(() => DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  fileMetadata: z.lazy(() => FileMetadataUncheckedUpdateOneWithoutDocumentNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mimeType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  keywords: z.union([ z.lazy(() => DocumentUpdatekeywordsInputSchema),z.string().array() ]).optional(),
  ocrText: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  signedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  signature: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SharedDocumentUpdateWithoutSharedWithInputSchema: z.ZodType<Prisma.SharedDocumentUpdateWithoutSharedWithInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sharedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  document: z.lazy(() => DocumentUpdateOneRequiredWithoutSharedWithNestedInputSchema).optional()
}).strict();

export const SharedDocumentUncheckedUpdateWithoutSharedWithInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedUpdateWithoutSharedWithInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sharedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SharedDocumentUncheckedUpdateManyWithoutSharedWithInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedUpdateManyWithoutSharedWithInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sharedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DigitalCertificateUpdateWithoutUserInputSchema: z.ZodType<Prisma.DigitalCertificateUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DigitalCertificateUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.DigitalCertificateUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DigitalCertificateUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.DigitalCertificateUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUpdateWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUpdateWithoutAssignedToInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workflow: z.lazy(() => WorkflowUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  document: z.lazy(() => DocumentUpdateOneWithoutTasksNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutAssignedToInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workflowId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutAssignedToInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutAssignedToInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workflowId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentVersionUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  changesDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  document: z.lazy(() => DocumentUpdateOneRequiredWithoutVersionsNestedInputSchema).optional()
}).strict();

export const DocumentVersionUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  changesDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentVersionUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedUpdateManyWithoutCreatedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  changesDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuditLogUpdateWithoutPerformedByInputSchema: z.ZodType<Prisma.AuditLogUpdateWithoutPerformedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutAuditLogsNestedInputSchema).optional()
}).strict();

export const AuditLogUncheckedUpdateWithoutPerformedByInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateWithoutPerformedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AuditLogUncheckedUpdateManyWithoutPerformedByInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateManyWithoutPerformedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SharedDocumentCreateManyDocumentInputSchema: z.ZodType<Prisma.SharedDocumentCreateManyDocumentInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  sharedAt: z.coerce.date().optional()
}).strict();

export const DocumentVersionCreateManyDocumentInputSchema: z.ZodType<Prisma.DocumentVersionCreateManyDocumentInput> = z.object({
  id: z.string().optional(),
  versionNumber: z.number().int(),
  filePath: z.string(),
  changesDescription: z.string().optional().nullable(),
  createdById: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const TaskCreateManyDocumentInputSchema: z.ZodType<Prisma.TaskCreateManyDocumentInput> = z.object({
  id: z.string().optional(),
  workflowId: z.string(),
  assignedToId: z.string().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SharedDocumentUpdateWithoutDocumentInputSchema: z.ZodType<Prisma.SharedDocumentUpdateWithoutDocumentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sharedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sharedWith: z.lazy(() => UserUpdateOneRequiredWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const SharedDocumentUncheckedUpdateWithoutDocumentInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedUpdateWithoutDocumentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sharedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SharedDocumentUncheckedUpdateManyWithoutDocumentInputSchema: z.ZodType<Prisma.SharedDocumentUncheckedUpdateManyWithoutDocumentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sharedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentVersionUpdateWithoutDocumentInputSchema: z.ZodType<Prisma.DocumentVersionUpdateWithoutDocumentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  changesDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutCreatedVersionsNestedInputSchema).optional()
}).strict();

export const DocumentVersionUncheckedUpdateWithoutDocumentInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedUpdateWithoutDocumentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  changesDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentVersionUncheckedUpdateManyWithoutDocumentInputSchema: z.ZodType<Prisma.DocumentVersionUncheckedUpdateManyWithoutDocumentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  filePath: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  changesDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUpdateWithoutDocumentInputSchema: z.ZodType<Prisma.TaskUpdateWithoutDocumentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workflow: z.lazy(() => WorkflowUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  assignedTo: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutDocumentInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutDocumentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workflowId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutDocumentInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutDocumentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workflowId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskCreateManyWorkflowInputSchema: z.ZodType<Prisma.TaskCreateManyWorkflowInput> = z.object({
  id: z.string().optional(),
  assignedToId: z.string().optional().nullable(),
  documentId: z.string().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TaskUpdateWithoutWorkflowInputSchema: z.ZodType<Prisma.TaskUpdateWithoutWorkflowInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedTo: z.lazy(() => UserUpdateOneWithoutTasksNestedInputSchema).optional(),
  document: z.lazy(() => DocumentUpdateOneWithoutTasksNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutWorkflowInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutWorkflowInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  documentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutWorkflowInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutWorkflowInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  documentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuditLogCreateManyTaskInputSchema: z.ZodType<Prisma.AuditLogCreateManyTaskInput> = z.object({
  id: z.string().optional(),
  action: z.string(),
  performedById: z.string(),
  timestamp: z.coerce.date().optional(),
  description: z.string().optional().nullable()
}).strict();

export const AuditLogUpdateWithoutTaskInputSchema: z.ZodType<Prisma.AuditLogUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  performedBy: z.lazy(() => UserUpdateOneRequiredWithoutAuditLogsNestedInputSchema).optional()
}).strict();

export const AuditLogUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AuditLogUncheckedUpdateManyWithoutTaskInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateManyWithoutTaskInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const back3nd_password_resetCreateManyUserInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateManyUserInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date()
}).strict();

export const back3nd_user_roleCreateManyUserInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyUserInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_password_resetUpdateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleUpdateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => back3nd_roleUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const back3nd_user_roleUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionCreateManyRoleInputSchema: z.ZodType<Prisma.back3nd_permissionCreateManyRoleInput> = z.object({
  id: z.string().optional(),
  table_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_user_roleCreateManyRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyRoleInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionUpdateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  table: z.lazy(() => back3nd_entityUpdateOneRequiredWithoutBack3nd_permissionNestedInputSchema).optional()
}).strict();

export const back3nd_permissionUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleUpdateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => back3nd_userUpdateOneRequiredWithoutRolesNestedInputSchema).optional()
}).strict();

export const back3nd_user_roleUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsCreateManyBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateManyBack3nd_entityInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionCreateManyTableInputSchema: z.ZodType<Prisma.back3nd_permissionCreateManyTableInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_entity_fieldsUpdateWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateWithoutBack3nd_entityInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsUncheckedUpdateWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedUpdateWithoutBack3nd_entityInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionUpdateWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateWithoutTableInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => back3nd_roleUpdateOneRequiredWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const back3nd_permissionUncheckedUpdateWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateWithoutTableInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyWithoutTableInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const DocumentFindFirstArgsSchema: z.ZodType<Prisma.DocumentFindFirstArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(),DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema,DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DocumentFindFirstOrThrowArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(),DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema,DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentFindManyArgsSchema: z.ZodType<Prisma.DocumentFindManyArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(),DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema,DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentAggregateArgsSchema: z.ZodType<Prisma.DocumentAggregateArgs> = z.object({
  where: DocumentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(),DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DocumentGroupByArgsSchema: z.ZodType<Prisma.DocumentGroupByArgs> = z.object({
  where: DocumentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentOrderByWithAggregationInputSchema.array(),DocumentOrderByWithAggregationInputSchema ]).optional(),
  by: DocumentScalarFieldEnumSchema.array(),
  having: DocumentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DocumentFindUniqueArgsSchema: z.ZodType<Prisma.DocumentFindUniqueArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema,
}).strict() ;

export const DocumentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DocumentFindUniqueOrThrowArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema,
}).strict() ;

export const DocumentVersionFindFirstArgsSchema: z.ZodType<Prisma.DocumentVersionFindFirstArgs> = z.object({
  select: DocumentVersionSelectSchema.optional(),
  include: DocumentVersionIncludeSchema.optional(),
  where: DocumentVersionWhereInputSchema.optional(),
  orderBy: z.union([ DocumentVersionOrderByWithRelationInputSchema.array(),DocumentVersionOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentVersionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentVersionScalarFieldEnumSchema,DocumentVersionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentVersionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DocumentVersionFindFirstOrThrowArgs> = z.object({
  select: DocumentVersionSelectSchema.optional(),
  include: DocumentVersionIncludeSchema.optional(),
  where: DocumentVersionWhereInputSchema.optional(),
  orderBy: z.union([ DocumentVersionOrderByWithRelationInputSchema.array(),DocumentVersionOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentVersionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentVersionScalarFieldEnumSchema,DocumentVersionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentVersionFindManyArgsSchema: z.ZodType<Prisma.DocumentVersionFindManyArgs> = z.object({
  select: DocumentVersionSelectSchema.optional(),
  include: DocumentVersionIncludeSchema.optional(),
  where: DocumentVersionWhereInputSchema.optional(),
  orderBy: z.union([ DocumentVersionOrderByWithRelationInputSchema.array(),DocumentVersionOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentVersionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentVersionScalarFieldEnumSchema,DocumentVersionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentVersionAggregateArgsSchema: z.ZodType<Prisma.DocumentVersionAggregateArgs> = z.object({
  where: DocumentVersionWhereInputSchema.optional(),
  orderBy: z.union([ DocumentVersionOrderByWithRelationInputSchema.array(),DocumentVersionOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentVersionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DocumentVersionGroupByArgsSchema: z.ZodType<Prisma.DocumentVersionGroupByArgs> = z.object({
  where: DocumentVersionWhereInputSchema.optional(),
  orderBy: z.union([ DocumentVersionOrderByWithAggregationInputSchema.array(),DocumentVersionOrderByWithAggregationInputSchema ]).optional(),
  by: DocumentVersionScalarFieldEnumSchema.array(),
  having: DocumentVersionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DocumentVersionFindUniqueArgsSchema: z.ZodType<Prisma.DocumentVersionFindUniqueArgs> = z.object({
  select: DocumentVersionSelectSchema.optional(),
  include: DocumentVersionIncludeSchema.optional(),
  where: DocumentVersionWhereUniqueInputSchema,
}).strict() ;

export const DocumentVersionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DocumentVersionFindUniqueOrThrowArgs> = z.object({
  select: DocumentVersionSelectSchema.optional(),
  include: DocumentVersionIncludeSchema.optional(),
  where: DocumentVersionWhereUniqueInputSchema,
}).strict() ;

export const WorkflowFindFirstArgsSchema: z.ZodType<Prisma.WorkflowFindFirstArgs> = z.object({
  select: WorkflowSelectSchema.optional(),
  include: WorkflowIncludeSchema.optional(),
  where: WorkflowWhereInputSchema.optional(),
  orderBy: z.union([ WorkflowOrderByWithRelationInputSchema.array(),WorkflowOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkflowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkflowScalarFieldEnumSchema,WorkflowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkflowFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkflowFindFirstOrThrowArgs> = z.object({
  select: WorkflowSelectSchema.optional(),
  include: WorkflowIncludeSchema.optional(),
  where: WorkflowWhereInputSchema.optional(),
  orderBy: z.union([ WorkflowOrderByWithRelationInputSchema.array(),WorkflowOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkflowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkflowScalarFieldEnumSchema,WorkflowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkflowFindManyArgsSchema: z.ZodType<Prisma.WorkflowFindManyArgs> = z.object({
  select: WorkflowSelectSchema.optional(),
  include: WorkflowIncludeSchema.optional(),
  where: WorkflowWhereInputSchema.optional(),
  orderBy: z.union([ WorkflowOrderByWithRelationInputSchema.array(),WorkflowOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkflowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkflowScalarFieldEnumSchema,WorkflowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkflowAggregateArgsSchema: z.ZodType<Prisma.WorkflowAggregateArgs> = z.object({
  where: WorkflowWhereInputSchema.optional(),
  orderBy: z.union([ WorkflowOrderByWithRelationInputSchema.array(),WorkflowOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkflowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkflowGroupByArgsSchema: z.ZodType<Prisma.WorkflowGroupByArgs> = z.object({
  where: WorkflowWhereInputSchema.optional(),
  orderBy: z.union([ WorkflowOrderByWithAggregationInputSchema.array(),WorkflowOrderByWithAggregationInputSchema ]).optional(),
  by: WorkflowScalarFieldEnumSchema.array(),
  having: WorkflowScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkflowFindUniqueArgsSchema: z.ZodType<Prisma.WorkflowFindUniqueArgs> = z.object({
  select: WorkflowSelectSchema.optional(),
  include: WorkflowIncludeSchema.optional(),
  where: WorkflowWhereUniqueInputSchema,
}).strict() ;

export const WorkflowFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkflowFindUniqueOrThrowArgs> = z.object({
  select: WorkflowSelectSchema.optional(),
  include: WorkflowIncludeSchema.optional(),
  where: WorkflowWhereUniqueInputSchema,
}).strict() ;

export const TaskFindFirstArgsSchema: z.ZodType<Prisma.TaskFindFirstArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskFindFirstOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindManyArgsSchema: z.ZodType<Prisma.TaskFindManyArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskAggregateArgsSchema: z.ZodType<Prisma.TaskAggregateArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskGroupByArgsSchema: z.ZodType<Prisma.TaskGroupByArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithAggregationInputSchema.array(),TaskOrderByWithAggregationInputSchema ]).optional(),
  by: TaskScalarFieldEnumSchema.array(),
  having: TaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskFindUniqueArgsSchema: z.ZodType<Prisma.TaskFindUniqueArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskFindUniqueOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const AuditLogFindFirstArgsSchema: z.ZodType<Prisma.AuditLogFindFirstArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereInputSchema.optional(),
  orderBy: z.union([ AuditLogOrderByWithRelationInputSchema.array(),AuditLogOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuditLogScalarFieldEnumSchema,AuditLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuditLogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuditLogFindFirstOrThrowArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereInputSchema.optional(),
  orderBy: z.union([ AuditLogOrderByWithRelationInputSchema.array(),AuditLogOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuditLogScalarFieldEnumSchema,AuditLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuditLogFindManyArgsSchema: z.ZodType<Prisma.AuditLogFindManyArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereInputSchema.optional(),
  orderBy: z.union([ AuditLogOrderByWithRelationInputSchema.array(),AuditLogOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuditLogScalarFieldEnumSchema,AuditLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuditLogAggregateArgsSchema: z.ZodType<Prisma.AuditLogAggregateArgs> = z.object({
  where: AuditLogWhereInputSchema.optional(),
  orderBy: z.union([ AuditLogOrderByWithRelationInputSchema.array(),AuditLogOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuditLogGroupByArgsSchema: z.ZodType<Prisma.AuditLogGroupByArgs> = z.object({
  where: AuditLogWhereInputSchema.optional(),
  orderBy: z.union([ AuditLogOrderByWithAggregationInputSchema.array(),AuditLogOrderByWithAggregationInputSchema ]).optional(),
  by: AuditLogScalarFieldEnumSchema.array(),
  having: AuditLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuditLogFindUniqueArgsSchema: z.ZodType<Prisma.AuditLogFindUniqueArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereUniqueInputSchema,
}).strict() ;

export const AuditLogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuditLogFindUniqueOrThrowArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereUniqueInputSchema,
}).strict() ;

export const SharedDocumentFindFirstArgsSchema: z.ZodType<Prisma.SharedDocumentFindFirstArgs> = z.object({
  select: SharedDocumentSelectSchema.optional(),
  include: SharedDocumentIncludeSchema.optional(),
  where: SharedDocumentWhereInputSchema.optional(),
  orderBy: z.union([ SharedDocumentOrderByWithRelationInputSchema.array(),SharedDocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: SharedDocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SharedDocumentScalarFieldEnumSchema,SharedDocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SharedDocumentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SharedDocumentFindFirstOrThrowArgs> = z.object({
  select: SharedDocumentSelectSchema.optional(),
  include: SharedDocumentIncludeSchema.optional(),
  where: SharedDocumentWhereInputSchema.optional(),
  orderBy: z.union([ SharedDocumentOrderByWithRelationInputSchema.array(),SharedDocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: SharedDocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SharedDocumentScalarFieldEnumSchema,SharedDocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SharedDocumentFindManyArgsSchema: z.ZodType<Prisma.SharedDocumentFindManyArgs> = z.object({
  select: SharedDocumentSelectSchema.optional(),
  include: SharedDocumentIncludeSchema.optional(),
  where: SharedDocumentWhereInputSchema.optional(),
  orderBy: z.union([ SharedDocumentOrderByWithRelationInputSchema.array(),SharedDocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: SharedDocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SharedDocumentScalarFieldEnumSchema,SharedDocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SharedDocumentAggregateArgsSchema: z.ZodType<Prisma.SharedDocumentAggregateArgs> = z.object({
  where: SharedDocumentWhereInputSchema.optional(),
  orderBy: z.union([ SharedDocumentOrderByWithRelationInputSchema.array(),SharedDocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: SharedDocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SharedDocumentGroupByArgsSchema: z.ZodType<Prisma.SharedDocumentGroupByArgs> = z.object({
  where: SharedDocumentWhereInputSchema.optional(),
  orderBy: z.union([ SharedDocumentOrderByWithAggregationInputSchema.array(),SharedDocumentOrderByWithAggregationInputSchema ]).optional(),
  by: SharedDocumentScalarFieldEnumSchema.array(),
  having: SharedDocumentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SharedDocumentFindUniqueArgsSchema: z.ZodType<Prisma.SharedDocumentFindUniqueArgs> = z.object({
  select: SharedDocumentSelectSchema.optional(),
  include: SharedDocumentIncludeSchema.optional(),
  where: SharedDocumentWhereUniqueInputSchema,
}).strict() ;

export const SharedDocumentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SharedDocumentFindUniqueOrThrowArgs> = z.object({
  select: SharedDocumentSelectSchema.optional(),
  include: SharedDocumentIncludeSchema.optional(),
  where: SharedDocumentWhereUniqueInputSchema,
}).strict() ;

export const DigitalCertificateFindFirstArgsSchema: z.ZodType<Prisma.DigitalCertificateFindFirstArgs> = z.object({
  select: DigitalCertificateSelectSchema.optional(),
  include: DigitalCertificateIncludeSchema.optional(),
  where: DigitalCertificateWhereInputSchema.optional(),
  orderBy: z.union([ DigitalCertificateOrderByWithRelationInputSchema.array(),DigitalCertificateOrderByWithRelationInputSchema ]).optional(),
  cursor: DigitalCertificateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DigitalCertificateScalarFieldEnumSchema,DigitalCertificateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DigitalCertificateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DigitalCertificateFindFirstOrThrowArgs> = z.object({
  select: DigitalCertificateSelectSchema.optional(),
  include: DigitalCertificateIncludeSchema.optional(),
  where: DigitalCertificateWhereInputSchema.optional(),
  orderBy: z.union([ DigitalCertificateOrderByWithRelationInputSchema.array(),DigitalCertificateOrderByWithRelationInputSchema ]).optional(),
  cursor: DigitalCertificateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DigitalCertificateScalarFieldEnumSchema,DigitalCertificateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DigitalCertificateFindManyArgsSchema: z.ZodType<Prisma.DigitalCertificateFindManyArgs> = z.object({
  select: DigitalCertificateSelectSchema.optional(),
  include: DigitalCertificateIncludeSchema.optional(),
  where: DigitalCertificateWhereInputSchema.optional(),
  orderBy: z.union([ DigitalCertificateOrderByWithRelationInputSchema.array(),DigitalCertificateOrderByWithRelationInputSchema ]).optional(),
  cursor: DigitalCertificateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DigitalCertificateScalarFieldEnumSchema,DigitalCertificateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DigitalCertificateAggregateArgsSchema: z.ZodType<Prisma.DigitalCertificateAggregateArgs> = z.object({
  where: DigitalCertificateWhereInputSchema.optional(),
  orderBy: z.union([ DigitalCertificateOrderByWithRelationInputSchema.array(),DigitalCertificateOrderByWithRelationInputSchema ]).optional(),
  cursor: DigitalCertificateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DigitalCertificateGroupByArgsSchema: z.ZodType<Prisma.DigitalCertificateGroupByArgs> = z.object({
  where: DigitalCertificateWhereInputSchema.optional(),
  orderBy: z.union([ DigitalCertificateOrderByWithAggregationInputSchema.array(),DigitalCertificateOrderByWithAggregationInputSchema ]).optional(),
  by: DigitalCertificateScalarFieldEnumSchema.array(),
  having: DigitalCertificateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DigitalCertificateFindUniqueArgsSchema: z.ZodType<Prisma.DigitalCertificateFindUniqueArgs> = z.object({
  select: DigitalCertificateSelectSchema.optional(),
  include: DigitalCertificateIncludeSchema.optional(),
  where: DigitalCertificateWhereUniqueInputSchema,
}).strict() ;

export const DigitalCertificateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DigitalCertificateFindUniqueOrThrowArgs> = z.object({
  select: DigitalCertificateSelectSchema.optional(),
  include: DigitalCertificateIncludeSchema.optional(),
  where: DigitalCertificateWhereUniqueInputSchema,
}).strict() ;

export const FileMetadataFindFirstArgsSchema: z.ZodType<Prisma.FileMetadataFindFirstArgs> = z.object({
  select: FileMetadataSelectSchema.optional(),
  include: FileMetadataIncludeSchema.optional(),
  where: FileMetadataWhereInputSchema.optional(),
  orderBy: z.union([ FileMetadataOrderByWithRelationInputSchema.array(),FileMetadataOrderByWithRelationInputSchema ]).optional(),
  cursor: FileMetadataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileMetadataScalarFieldEnumSchema,FileMetadataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FileMetadataFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FileMetadataFindFirstOrThrowArgs> = z.object({
  select: FileMetadataSelectSchema.optional(),
  include: FileMetadataIncludeSchema.optional(),
  where: FileMetadataWhereInputSchema.optional(),
  orderBy: z.union([ FileMetadataOrderByWithRelationInputSchema.array(),FileMetadataOrderByWithRelationInputSchema ]).optional(),
  cursor: FileMetadataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileMetadataScalarFieldEnumSchema,FileMetadataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FileMetadataFindManyArgsSchema: z.ZodType<Prisma.FileMetadataFindManyArgs> = z.object({
  select: FileMetadataSelectSchema.optional(),
  include: FileMetadataIncludeSchema.optional(),
  where: FileMetadataWhereInputSchema.optional(),
  orderBy: z.union([ FileMetadataOrderByWithRelationInputSchema.array(),FileMetadataOrderByWithRelationInputSchema ]).optional(),
  cursor: FileMetadataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileMetadataScalarFieldEnumSchema,FileMetadataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FileMetadataAggregateArgsSchema: z.ZodType<Prisma.FileMetadataAggregateArgs> = z.object({
  where: FileMetadataWhereInputSchema.optional(),
  orderBy: z.union([ FileMetadataOrderByWithRelationInputSchema.array(),FileMetadataOrderByWithRelationInputSchema ]).optional(),
  cursor: FileMetadataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FileMetadataGroupByArgsSchema: z.ZodType<Prisma.FileMetadataGroupByArgs> = z.object({
  where: FileMetadataWhereInputSchema.optional(),
  orderBy: z.union([ FileMetadataOrderByWithAggregationInputSchema.array(),FileMetadataOrderByWithAggregationInputSchema ]).optional(),
  by: FileMetadataScalarFieldEnumSchema.array(),
  having: FileMetadataScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FileMetadataFindUniqueArgsSchema: z.ZodType<Prisma.FileMetadataFindUniqueArgs> = z.object({
  select: FileMetadataSelectSchema.optional(),
  include: FileMetadataIncludeSchema.optional(),
  where: FileMetadataWhereUniqueInputSchema,
}).strict() ;

export const FileMetadataFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FileMetadataFindUniqueOrThrowArgs> = z.object({
  select: FileMetadataSelectSchema.optional(),
  include: FileMetadataIncludeSchema.optional(),
  where: FileMetadataWhereUniqueInputSchema,
}).strict() ;

export const back3nd_userFindFirstArgsSchema: z.ZodType<Prisma.back3nd_userFindFirstArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_userOrderByWithRelationInputSchema.array(),back3nd_userOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_userScalarFieldEnumSchema,Back3nd_userScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_userFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_userFindFirstOrThrowArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_userOrderByWithRelationInputSchema.array(),back3nd_userOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_userScalarFieldEnumSchema,Back3nd_userScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_userFindManyArgsSchema: z.ZodType<Prisma.back3nd_userFindManyArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_userOrderByWithRelationInputSchema.array(),back3nd_userOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_userScalarFieldEnumSchema,Back3nd_userScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_userAggregateArgsSchema: z.ZodType<Prisma.back3nd_userAggregateArgs> = z.object({
  where: back3nd_userWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_userOrderByWithRelationInputSchema.array(),back3nd_userOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_userGroupByArgsSchema: z.ZodType<Prisma.back3nd_userGroupByArgs> = z.object({
  where: back3nd_userWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_userOrderByWithAggregationInputSchema.array(),back3nd_userOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_userScalarFieldEnumSchema.array(),
  having: back3nd_userScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_userFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_userFindUniqueArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereUniqueInputSchema,
}).strict() ;

export const back3nd_userFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_userFindUniqueOrThrowArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereUniqueInputSchema,
}).strict() ;

export const back3nd_roleFindFirstArgsSchema: z.ZodType<Prisma.back3nd_roleFindFirstArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_roleOrderByWithRelationInputSchema.array(),back3nd_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_roleScalarFieldEnumSchema,Back3nd_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_roleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_roleFindFirstOrThrowArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_roleOrderByWithRelationInputSchema.array(),back3nd_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_roleScalarFieldEnumSchema,Back3nd_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_roleFindManyArgsSchema: z.ZodType<Prisma.back3nd_roleFindManyArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_roleOrderByWithRelationInputSchema.array(),back3nd_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_roleScalarFieldEnumSchema,Back3nd_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_roleAggregateArgsSchema: z.ZodType<Prisma.back3nd_roleAggregateArgs> = z.object({
  where: back3nd_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_roleOrderByWithRelationInputSchema.array(),back3nd_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_roleGroupByArgsSchema: z.ZodType<Prisma.back3nd_roleGroupByArgs> = z.object({
  where: back3nd_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_roleOrderByWithAggregationInputSchema.array(),back3nd_roleOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_roleScalarFieldEnumSchema.array(),
  having: back3nd_roleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_roleFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_roleFindUniqueArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_roleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_roleFindUniqueOrThrowArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_user_roleFindFirstArgsSchema: z.ZodType<Prisma.back3nd_user_roleFindFirstArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_user_roleOrderByWithRelationInputSchema.array(),back3nd_user_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_user_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_user_roleScalarFieldEnumSchema,Back3nd_user_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_user_roleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_user_roleFindFirstOrThrowArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_user_roleOrderByWithRelationInputSchema.array(),back3nd_user_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_user_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_user_roleScalarFieldEnumSchema,Back3nd_user_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_user_roleFindManyArgsSchema: z.ZodType<Prisma.back3nd_user_roleFindManyArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_user_roleOrderByWithRelationInputSchema.array(),back3nd_user_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_user_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_user_roleScalarFieldEnumSchema,Back3nd_user_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_user_roleAggregateArgsSchema: z.ZodType<Prisma.back3nd_user_roleAggregateArgs> = z.object({
  where: back3nd_user_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_user_roleOrderByWithRelationInputSchema.array(),back3nd_user_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_user_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_user_roleGroupByArgsSchema: z.ZodType<Prisma.back3nd_user_roleGroupByArgs> = z.object({
  where: back3nd_user_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_user_roleOrderByWithAggregationInputSchema.array(),back3nd_user_roleOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_user_roleScalarFieldEnumSchema.array(),
  having: back3nd_user_roleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_user_roleFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_user_roleFindUniqueArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_user_roleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_user_roleFindUniqueOrThrowArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_permissionFindFirstArgsSchema: z.ZodType<Prisma.back3nd_permissionFindFirstArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_permissionOrderByWithRelationInputSchema.array(),back3nd_permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_permissionScalarFieldEnumSchema,Back3nd_permissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_permissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_permissionFindFirstOrThrowArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_permissionOrderByWithRelationInputSchema.array(),back3nd_permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_permissionScalarFieldEnumSchema,Back3nd_permissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_permissionFindManyArgsSchema: z.ZodType<Prisma.back3nd_permissionFindManyArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_permissionOrderByWithRelationInputSchema.array(),back3nd_permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_permissionScalarFieldEnumSchema,Back3nd_permissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_permissionAggregateArgsSchema: z.ZodType<Prisma.back3nd_permissionAggregateArgs> = z.object({
  where: back3nd_permissionWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_permissionOrderByWithRelationInputSchema.array(),back3nd_permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_permissionGroupByArgsSchema: z.ZodType<Prisma.back3nd_permissionGroupByArgs> = z.object({
  where: back3nd_permissionWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_permissionOrderByWithAggregationInputSchema.array(),back3nd_permissionOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_permissionScalarFieldEnumSchema.array(),
  having: back3nd_permissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_permissionFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_permissionFindUniqueArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereUniqueInputSchema,
}).strict() ;

export const back3nd_permissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_permissionFindUniqueOrThrowArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entityFindFirstArgsSchema: z.ZodType<Prisma.back3nd_entityFindFirstArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entityOrderByWithRelationInputSchema.array(),back3nd_entityOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entityScalarFieldEnumSchema,Back3nd_entityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_entityFindFirstOrThrowArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entityOrderByWithRelationInputSchema.array(),back3nd_entityOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entityScalarFieldEnumSchema,Back3nd_entityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entityFindManyArgsSchema: z.ZodType<Prisma.back3nd_entityFindManyArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entityOrderByWithRelationInputSchema.array(),back3nd_entityOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entityScalarFieldEnumSchema,Back3nd_entityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entityAggregateArgsSchema: z.ZodType<Prisma.back3nd_entityAggregateArgs> = z.object({
  where: back3nd_entityWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entityOrderByWithRelationInputSchema.array(),back3nd_entityOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_entityGroupByArgsSchema: z.ZodType<Prisma.back3nd_entityGroupByArgs> = z.object({
  where: back3nd_entityWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entityOrderByWithAggregationInputSchema.array(),back3nd_entityOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_entityScalarFieldEnumSchema.array(),
  having: back3nd_entityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_entityFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_entityFindUniqueArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_entityFindUniqueOrThrowArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entity_fieldsFindFirstArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsFindFirstArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entity_fieldsOrderByWithRelationInputSchema.array(),back3nd_entity_fieldsOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entity_fieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entity_fieldsScalarFieldEnumSchema,Back3nd_entity_fieldsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entity_fieldsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsFindFirstOrThrowArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entity_fieldsOrderByWithRelationInputSchema.array(),back3nd_entity_fieldsOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entity_fieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entity_fieldsScalarFieldEnumSchema,Back3nd_entity_fieldsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entity_fieldsFindManyArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsFindManyArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entity_fieldsOrderByWithRelationInputSchema.array(),back3nd_entity_fieldsOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entity_fieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entity_fieldsScalarFieldEnumSchema,Back3nd_entity_fieldsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entity_fieldsAggregateArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsAggregateArgs> = z.object({
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entity_fieldsOrderByWithRelationInputSchema.array(),back3nd_entity_fieldsOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entity_fieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_entity_fieldsGroupByArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsGroupByArgs> = z.object({
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entity_fieldsOrderByWithAggregationInputSchema.array(),back3nd_entity_fieldsOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_entity_fieldsScalarFieldEnumSchema.array(),
  having: back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_entity_fieldsFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsFindUniqueArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entity_fieldsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsFindUniqueOrThrowArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereUniqueInputSchema,
}).strict() ;

export const back3nd_password_resetFindFirstArgsSchema: z.ZodType<Prisma.back3nd_password_resetFindFirstArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_password_resetOrderByWithRelationInputSchema.array(),back3nd_password_resetOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_password_resetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_password_resetScalarFieldEnumSchema,Back3nd_password_resetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_password_resetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_password_resetFindFirstOrThrowArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_password_resetOrderByWithRelationInputSchema.array(),back3nd_password_resetOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_password_resetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_password_resetScalarFieldEnumSchema,Back3nd_password_resetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_password_resetFindManyArgsSchema: z.ZodType<Prisma.back3nd_password_resetFindManyArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_password_resetOrderByWithRelationInputSchema.array(),back3nd_password_resetOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_password_resetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_password_resetScalarFieldEnumSchema,Back3nd_password_resetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_password_resetAggregateArgsSchema: z.ZodType<Prisma.back3nd_password_resetAggregateArgs> = z.object({
  where: back3nd_password_resetWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_password_resetOrderByWithRelationInputSchema.array(),back3nd_password_resetOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_password_resetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_password_resetGroupByArgsSchema: z.ZodType<Prisma.back3nd_password_resetGroupByArgs> = z.object({
  where: back3nd_password_resetWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_password_resetOrderByWithAggregationInputSchema.array(),back3nd_password_resetOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_password_resetScalarFieldEnumSchema.array(),
  having: back3nd_password_resetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_password_resetFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_password_resetFindUniqueArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereUniqueInputSchema,
}).strict() ;

export const back3nd_password_resetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_password_resetFindUniqueOrThrowArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const DocumentCreateArgsSchema: z.ZodType<Prisma.DocumentCreateArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  data: z.union([ DocumentCreateInputSchema,DocumentUncheckedCreateInputSchema ]),
}).strict() ;

export const DocumentUpsertArgsSchema: z.ZodType<Prisma.DocumentUpsertArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema,
  create: z.union([ DocumentCreateInputSchema,DocumentUncheckedCreateInputSchema ]),
  update: z.union([ DocumentUpdateInputSchema,DocumentUncheckedUpdateInputSchema ]),
}).strict() ;

export const DocumentCreateManyArgsSchema: z.ZodType<Prisma.DocumentCreateManyArgs> = z.object({
  data: z.union([ DocumentCreateManyInputSchema,DocumentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DocumentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DocumentCreateManyAndReturnArgs> = z.object({
  data: z.union([ DocumentCreateManyInputSchema,DocumentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DocumentDeleteArgsSchema: z.ZodType<Prisma.DocumentDeleteArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema,
}).strict() ;

export const DocumentUpdateArgsSchema: z.ZodType<Prisma.DocumentUpdateArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  data: z.union([ DocumentUpdateInputSchema,DocumentUncheckedUpdateInputSchema ]),
  where: DocumentWhereUniqueInputSchema,
}).strict() ;

export const DocumentUpdateManyArgsSchema: z.ZodType<Prisma.DocumentUpdateManyArgs> = z.object({
  data: z.union([ DocumentUpdateManyMutationInputSchema,DocumentUncheckedUpdateManyInputSchema ]),
  where: DocumentWhereInputSchema.optional(),
}).strict() ;

export const DocumentDeleteManyArgsSchema: z.ZodType<Prisma.DocumentDeleteManyArgs> = z.object({
  where: DocumentWhereInputSchema.optional(),
}).strict() ;

export const DocumentVersionCreateArgsSchema: z.ZodType<Prisma.DocumentVersionCreateArgs> = z.object({
  select: DocumentVersionSelectSchema.optional(),
  include: DocumentVersionIncludeSchema.optional(),
  data: z.union([ DocumentVersionCreateInputSchema,DocumentVersionUncheckedCreateInputSchema ]),
}).strict() ;

export const DocumentVersionUpsertArgsSchema: z.ZodType<Prisma.DocumentVersionUpsertArgs> = z.object({
  select: DocumentVersionSelectSchema.optional(),
  include: DocumentVersionIncludeSchema.optional(),
  where: DocumentVersionWhereUniqueInputSchema,
  create: z.union([ DocumentVersionCreateInputSchema,DocumentVersionUncheckedCreateInputSchema ]),
  update: z.union([ DocumentVersionUpdateInputSchema,DocumentVersionUncheckedUpdateInputSchema ]),
}).strict() ;

export const DocumentVersionCreateManyArgsSchema: z.ZodType<Prisma.DocumentVersionCreateManyArgs> = z.object({
  data: z.union([ DocumentVersionCreateManyInputSchema,DocumentVersionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DocumentVersionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DocumentVersionCreateManyAndReturnArgs> = z.object({
  data: z.union([ DocumentVersionCreateManyInputSchema,DocumentVersionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DocumentVersionDeleteArgsSchema: z.ZodType<Prisma.DocumentVersionDeleteArgs> = z.object({
  select: DocumentVersionSelectSchema.optional(),
  include: DocumentVersionIncludeSchema.optional(),
  where: DocumentVersionWhereUniqueInputSchema,
}).strict() ;

export const DocumentVersionUpdateArgsSchema: z.ZodType<Prisma.DocumentVersionUpdateArgs> = z.object({
  select: DocumentVersionSelectSchema.optional(),
  include: DocumentVersionIncludeSchema.optional(),
  data: z.union([ DocumentVersionUpdateInputSchema,DocumentVersionUncheckedUpdateInputSchema ]),
  where: DocumentVersionWhereUniqueInputSchema,
}).strict() ;

export const DocumentVersionUpdateManyArgsSchema: z.ZodType<Prisma.DocumentVersionUpdateManyArgs> = z.object({
  data: z.union([ DocumentVersionUpdateManyMutationInputSchema,DocumentVersionUncheckedUpdateManyInputSchema ]),
  where: DocumentVersionWhereInputSchema.optional(),
}).strict() ;

export const DocumentVersionDeleteManyArgsSchema: z.ZodType<Prisma.DocumentVersionDeleteManyArgs> = z.object({
  where: DocumentVersionWhereInputSchema.optional(),
}).strict() ;

export const WorkflowCreateArgsSchema: z.ZodType<Prisma.WorkflowCreateArgs> = z.object({
  select: WorkflowSelectSchema.optional(),
  include: WorkflowIncludeSchema.optional(),
  data: z.union([ WorkflowCreateInputSchema,WorkflowUncheckedCreateInputSchema ]),
}).strict() ;

export const WorkflowUpsertArgsSchema: z.ZodType<Prisma.WorkflowUpsertArgs> = z.object({
  select: WorkflowSelectSchema.optional(),
  include: WorkflowIncludeSchema.optional(),
  where: WorkflowWhereUniqueInputSchema,
  create: z.union([ WorkflowCreateInputSchema,WorkflowUncheckedCreateInputSchema ]),
  update: z.union([ WorkflowUpdateInputSchema,WorkflowUncheckedUpdateInputSchema ]),
}).strict() ;

export const WorkflowCreateManyArgsSchema: z.ZodType<Prisma.WorkflowCreateManyArgs> = z.object({
  data: z.union([ WorkflowCreateManyInputSchema,WorkflowCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkflowCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkflowCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkflowCreateManyInputSchema,WorkflowCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkflowDeleteArgsSchema: z.ZodType<Prisma.WorkflowDeleteArgs> = z.object({
  select: WorkflowSelectSchema.optional(),
  include: WorkflowIncludeSchema.optional(),
  where: WorkflowWhereUniqueInputSchema,
}).strict() ;

export const WorkflowUpdateArgsSchema: z.ZodType<Prisma.WorkflowUpdateArgs> = z.object({
  select: WorkflowSelectSchema.optional(),
  include: WorkflowIncludeSchema.optional(),
  data: z.union([ WorkflowUpdateInputSchema,WorkflowUncheckedUpdateInputSchema ]),
  where: WorkflowWhereUniqueInputSchema,
}).strict() ;

export const WorkflowUpdateManyArgsSchema: z.ZodType<Prisma.WorkflowUpdateManyArgs> = z.object({
  data: z.union([ WorkflowUpdateManyMutationInputSchema,WorkflowUncheckedUpdateManyInputSchema ]),
  where: WorkflowWhereInputSchema.optional(),
}).strict() ;

export const WorkflowDeleteManyArgsSchema: z.ZodType<Prisma.WorkflowDeleteManyArgs> = z.object({
  where: WorkflowWhereInputSchema.optional(),
}).strict() ;

export const TaskCreateArgsSchema: z.ZodType<Prisma.TaskCreateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
}).strict() ;

export const TaskUpsertArgsSchema: z.ZodType<Prisma.TaskUpsertArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
  create: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
  update: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
}).strict() ;

export const TaskCreateManyArgsSchema: z.ZodType<Prisma.TaskCreateManyArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TaskCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskCreateManyAndReturnArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TaskDeleteArgsSchema: z.ZodType<Prisma.TaskDeleteArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateArgsSchema: z.ZodType<Prisma.TaskUpdateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateManyArgsSchema: z.ZodType<Prisma.TaskUpdateManyArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
}).strict() ;

export const TaskDeleteManyArgsSchema: z.ZodType<Prisma.TaskDeleteManyArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
}).strict() ;

export const AuditLogCreateArgsSchema: z.ZodType<Prisma.AuditLogCreateArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  data: z.union([ AuditLogCreateInputSchema,AuditLogUncheckedCreateInputSchema ]),
}).strict() ;

export const AuditLogUpsertArgsSchema: z.ZodType<Prisma.AuditLogUpsertArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereUniqueInputSchema,
  create: z.union([ AuditLogCreateInputSchema,AuditLogUncheckedCreateInputSchema ]),
  update: z.union([ AuditLogUpdateInputSchema,AuditLogUncheckedUpdateInputSchema ]),
}).strict() ;

export const AuditLogCreateManyArgsSchema: z.ZodType<Prisma.AuditLogCreateManyArgs> = z.object({
  data: z.union([ AuditLogCreateManyInputSchema,AuditLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AuditLogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AuditLogCreateManyAndReturnArgs> = z.object({
  data: z.union([ AuditLogCreateManyInputSchema,AuditLogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AuditLogDeleteArgsSchema: z.ZodType<Prisma.AuditLogDeleteArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereUniqueInputSchema,
}).strict() ;

export const AuditLogUpdateArgsSchema: z.ZodType<Prisma.AuditLogUpdateArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  data: z.union([ AuditLogUpdateInputSchema,AuditLogUncheckedUpdateInputSchema ]),
  where: AuditLogWhereUniqueInputSchema,
}).strict() ;

export const AuditLogUpdateManyArgsSchema: z.ZodType<Prisma.AuditLogUpdateManyArgs> = z.object({
  data: z.union([ AuditLogUpdateManyMutationInputSchema,AuditLogUncheckedUpdateManyInputSchema ]),
  where: AuditLogWhereInputSchema.optional(),
}).strict() ;

export const AuditLogDeleteManyArgsSchema: z.ZodType<Prisma.AuditLogDeleteManyArgs> = z.object({
  where: AuditLogWhereInputSchema.optional(),
}).strict() ;

export const SharedDocumentCreateArgsSchema: z.ZodType<Prisma.SharedDocumentCreateArgs> = z.object({
  select: SharedDocumentSelectSchema.optional(),
  include: SharedDocumentIncludeSchema.optional(),
  data: z.union([ SharedDocumentCreateInputSchema,SharedDocumentUncheckedCreateInputSchema ]),
}).strict() ;

export const SharedDocumentUpsertArgsSchema: z.ZodType<Prisma.SharedDocumentUpsertArgs> = z.object({
  select: SharedDocumentSelectSchema.optional(),
  include: SharedDocumentIncludeSchema.optional(),
  where: SharedDocumentWhereUniqueInputSchema,
  create: z.union([ SharedDocumentCreateInputSchema,SharedDocumentUncheckedCreateInputSchema ]),
  update: z.union([ SharedDocumentUpdateInputSchema,SharedDocumentUncheckedUpdateInputSchema ]),
}).strict() ;

export const SharedDocumentCreateManyArgsSchema: z.ZodType<Prisma.SharedDocumentCreateManyArgs> = z.object({
  data: z.union([ SharedDocumentCreateManyInputSchema,SharedDocumentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SharedDocumentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SharedDocumentCreateManyAndReturnArgs> = z.object({
  data: z.union([ SharedDocumentCreateManyInputSchema,SharedDocumentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SharedDocumentDeleteArgsSchema: z.ZodType<Prisma.SharedDocumentDeleteArgs> = z.object({
  select: SharedDocumentSelectSchema.optional(),
  include: SharedDocumentIncludeSchema.optional(),
  where: SharedDocumentWhereUniqueInputSchema,
}).strict() ;

export const SharedDocumentUpdateArgsSchema: z.ZodType<Prisma.SharedDocumentUpdateArgs> = z.object({
  select: SharedDocumentSelectSchema.optional(),
  include: SharedDocumentIncludeSchema.optional(),
  data: z.union([ SharedDocumentUpdateInputSchema,SharedDocumentUncheckedUpdateInputSchema ]),
  where: SharedDocumentWhereUniqueInputSchema,
}).strict() ;

export const SharedDocumentUpdateManyArgsSchema: z.ZodType<Prisma.SharedDocumentUpdateManyArgs> = z.object({
  data: z.union([ SharedDocumentUpdateManyMutationInputSchema,SharedDocumentUncheckedUpdateManyInputSchema ]),
  where: SharedDocumentWhereInputSchema.optional(),
}).strict() ;

export const SharedDocumentDeleteManyArgsSchema: z.ZodType<Prisma.SharedDocumentDeleteManyArgs> = z.object({
  where: SharedDocumentWhereInputSchema.optional(),
}).strict() ;

export const DigitalCertificateCreateArgsSchema: z.ZodType<Prisma.DigitalCertificateCreateArgs> = z.object({
  select: DigitalCertificateSelectSchema.optional(),
  include: DigitalCertificateIncludeSchema.optional(),
  data: z.union([ DigitalCertificateCreateInputSchema,DigitalCertificateUncheckedCreateInputSchema ]),
}).strict() ;

export const DigitalCertificateUpsertArgsSchema: z.ZodType<Prisma.DigitalCertificateUpsertArgs> = z.object({
  select: DigitalCertificateSelectSchema.optional(),
  include: DigitalCertificateIncludeSchema.optional(),
  where: DigitalCertificateWhereUniqueInputSchema,
  create: z.union([ DigitalCertificateCreateInputSchema,DigitalCertificateUncheckedCreateInputSchema ]),
  update: z.union([ DigitalCertificateUpdateInputSchema,DigitalCertificateUncheckedUpdateInputSchema ]),
}).strict() ;

export const DigitalCertificateCreateManyArgsSchema: z.ZodType<Prisma.DigitalCertificateCreateManyArgs> = z.object({
  data: z.union([ DigitalCertificateCreateManyInputSchema,DigitalCertificateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DigitalCertificateCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DigitalCertificateCreateManyAndReturnArgs> = z.object({
  data: z.union([ DigitalCertificateCreateManyInputSchema,DigitalCertificateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DigitalCertificateDeleteArgsSchema: z.ZodType<Prisma.DigitalCertificateDeleteArgs> = z.object({
  select: DigitalCertificateSelectSchema.optional(),
  include: DigitalCertificateIncludeSchema.optional(),
  where: DigitalCertificateWhereUniqueInputSchema,
}).strict() ;

export const DigitalCertificateUpdateArgsSchema: z.ZodType<Prisma.DigitalCertificateUpdateArgs> = z.object({
  select: DigitalCertificateSelectSchema.optional(),
  include: DigitalCertificateIncludeSchema.optional(),
  data: z.union([ DigitalCertificateUpdateInputSchema,DigitalCertificateUncheckedUpdateInputSchema ]),
  where: DigitalCertificateWhereUniqueInputSchema,
}).strict() ;

export const DigitalCertificateUpdateManyArgsSchema: z.ZodType<Prisma.DigitalCertificateUpdateManyArgs> = z.object({
  data: z.union([ DigitalCertificateUpdateManyMutationInputSchema,DigitalCertificateUncheckedUpdateManyInputSchema ]),
  where: DigitalCertificateWhereInputSchema.optional(),
}).strict() ;

export const DigitalCertificateDeleteManyArgsSchema: z.ZodType<Prisma.DigitalCertificateDeleteManyArgs> = z.object({
  where: DigitalCertificateWhereInputSchema.optional(),
}).strict() ;

export const FileMetadataCreateArgsSchema: z.ZodType<Prisma.FileMetadataCreateArgs> = z.object({
  select: FileMetadataSelectSchema.optional(),
  include: FileMetadataIncludeSchema.optional(),
  data: z.union([ FileMetadataCreateInputSchema,FileMetadataUncheckedCreateInputSchema ]),
}).strict() ;

export const FileMetadataUpsertArgsSchema: z.ZodType<Prisma.FileMetadataUpsertArgs> = z.object({
  select: FileMetadataSelectSchema.optional(),
  include: FileMetadataIncludeSchema.optional(),
  where: FileMetadataWhereUniqueInputSchema,
  create: z.union([ FileMetadataCreateInputSchema,FileMetadataUncheckedCreateInputSchema ]),
  update: z.union([ FileMetadataUpdateInputSchema,FileMetadataUncheckedUpdateInputSchema ]),
}).strict() ;

export const FileMetadataCreateManyArgsSchema: z.ZodType<Prisma.FileMetadataCreateManyArgs> = z.object({
  data: z.union([ FileMetadataCreateManyInputSchema,FileMetadataCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FileMetadataCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FileMetadataCreateManyAndReturnArgs> = z.object({
  data: z.union([ FileMetadataCreateManyInputSchema,FileMetadataCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FileMetadataDeleteArgsSchema: z.ZodType<Prisma.FileMetadataDeleteArgs> = z.object({
  select: FileMetadataSelectSchema.optional(),
  include: FileMetadataIncludeSchema.optional(),
  where: FileMetadataWhereUniqueInputSchema,
}).strict() ;

export const FileMetadataUpdateArgsSchema: z.ZodType<Prisma.FileMetadataUpdateArgs> = z.object({
  select: FileMetadataSelectSchema.optional(),
  include: FileMetadataIncludeSchema.optional(),
  data: z.union([ FileMetadataUpdateInputSchema,FileMetadataUncheckedUpdateInputSchema ]),
  where: FileMetadataWhereUniqueInputSchema,
}).strict() ;

export const FileMetadataUpdateManyArgsSchema: z.ZodType<Prisma.FileMetadataUpdateManyArgs> = z.object({
  data: z.union([ FileMetadataUpdateManyMutationInputSchema,FileMetadataUncheckedUpdateManyInputSchema ]),
  where: FileMetadataWhereInputSchema.optional(),
}).strict() ;

export const FileMetadataDeleteManyArgsSchema: z.ZodType<Prisma.FileMetadataDeleteManyArgs> = z.object({
  where: FileMetadataWhereInputSchema.optional(),
}).strict() ;

export const back3nd_userCreateArgsSchema: z.ZodType<Prisma.back3nd_userCreateArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  data: z.union([ back3nd_userCreateInputSchema,back3nd_userUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_userUpsertArgsSchema: z.ZodType<Prisma.back3nd_userUpsertArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereUniqueInputSchema,
  create: z.union([ back3nd_userCreateInputSchema,back3nd_userUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_userUpdateInputSchema,back3nd_userUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_userCreateManyArgsSchema: z.ZodType<Prisma.back3nd_userCreateManyArgs> = z.object({
  data: z.union([ back3nd_userCreateManyInputSchema,back3nd_userCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_userCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_userCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_userCreateManyInputSchema,back3nd_userCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_userDeleteArgsSchema: z.ZodType<Prisma.back3nd_userDeleteArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereUniqueInputSchema,
}).strict() ;

export const back3nd_userUpdateArgsSchema: z.ZodType<Prisma.back3nd_userUpdateArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  data: z.union([ back3nd_userUpdateInputSchema,back3nd_userUncheckedUpdateInputSchema ]),
  where: back3nd_userWhereUniqueInputSchema,
}).strict() ;

export const back3nd_userUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_userUpdateManyArgs> = z.object({
  data: z.union([ back3nd_userUpdateManyMutationInputSchema,back3nd_userUncheckedUpdateManyInputSchema ]),
  where: back3nd_userWhereInputSchema.optional(),
}).strict() ;

export const back3nd_userDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_userDeleteManyArgs> = z.object({
  where: back3nd_userWhereInputSchema.optional(),
}).strict() ;

export const back3nd_roleCreateArgsSchema: z.ZodType<Prisma.back3nd_roleCreateArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  data: z.union([ back3nd_roleCreateInputSchema,back3nd_roleUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_roleUpsertArgsSchema: z.ZodType<Prisma.back3nd_roleUpsertArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereUniqueInputSchema,
  create: z.union([ back3nd_roleCreateInputSchema,back3nd_roleUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_roleUpdateInputSchema,back3nd_roleUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_roleCreateManyArgsSchema: z.ZodType<Prisma.back3nd_roleCreateManyArgs> = z.object({
  data: z.union([ back3nd_roleCreateManyInputSchema,back3nd_roleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_roleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_roleCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_roleCreateManyInputSchema,back3nd_roleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_roleDeleteArgsSchema: z.ZodType<Prisma.back3nd_roleDeleteArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_roleUpdateArgsSchema: z.ZodType<Prisma.back3nd_roleUpdateArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  data: z.union([ back3nd_roleUpdateInputSchema,back3nd_roleUncheckedUpdateInputSchema ]),
  where: back3nd_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_roleUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_roleUpdateManyArgs> = z.object({
  data: z.union([ back3nd_roleUpdateManyMutationInputSchema,back3nd_roleUncheckedUpdateManyInputSchema ]),
  where: back3nd_roleWhereInputSchema.optional(),
}).strict() ;

export const back3nd_roleDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_roleDeleteManyArgs> = z.object({
  where: back3nd_roleWhereInputSchema.optional(),
}).strict() ;

export const back3nd_user_roleCreateArgsSchema: z.ZodType<Prisma.back3nd_user_roleCreateArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  data: z.union([ back3nd_user_roleCreateInputSchema,back3nd_user_roleUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_user_roleUpsertArgsSchema: z.ZodType<Prisma.back3nd_user_roleUpsertArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereUniqueInputSchema,
  create: z.union([ back3nd_user_roleCreateInputSchema,back3nd_user_roleUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_user_roleUpdateInputSchema,back3nd_user_roleUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_user_roleCreateManyArgsSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyArgs> = z.object({
  data: z.union([ back3nd_user_roleCreateManyInputSchema,back3nd_user_roleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_user_roleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_user_roleCreateManyInputSchema,back3nd_user_roleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_user_roleDeleteArgsSchema: z.ZodType<Prisma.back3nd_user_roleDeleteArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_user_roleUpdateArgsSchema: z.ZodType<Prisma.back3nd_user_roleUpdateArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  data: z.union([ back3nd_user_roleUpdateInputSchema,back3nd_user_roleUncheckedUpdateInputSchema ]),
  where: back3nd_user_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_user_roleUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyArgs> = z.object({
  data: z.union([ back3nd_user_roleUpdateManyMutationInputSchema,back3nd_user_roleUncheckedUpdateManyInputSchema ]),
  where: back3nd_user_roleWhereInputSchema.optional(),
}).strict() ;

export const back3nd_user_roleDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_user_roleDeleteManyArgs> = z.object({
  where: back3nd_user_roleWhereInputSchema.optional(),
}).strict() ;

export const back3nd_permissionCreateArgsSchema: z.ZodType<Prisma.back3nd_permissionCreateArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  data: z.union([ back3nd_permissionCreateInputSchema,back3nd_permissionUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_permissionUpsertArgsSchema: z.ZodType<Prisma.back3nd_permissionUpsertArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereUniqueInputSchema,
  create: z.union([ back3nd_permissionCreateInputSchema,back3nd_permissionUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_permissionUpdateInputSchema,back3nd_permissionUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_permissionCreateManyArgsSchema: z.ZodType<Prisma.back3nd_permissionCreateManyArgs> = z.object({
  data: z.union([ back3nd_permissionCreateManyInputSchema,back3nd_permissionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_permissionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_permissionCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_permissionCreateManyInputSchema,back3nd_permissionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_permissionDeleteArgsSchema: z.ZodType<Prisma.back3nd_permissionDeleteArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereUniqueInputSchema,
}).strict() ;

export const back3nd_permissionUpdateArgsSchema: z.ZodType<Prisma.back3nd_permissionUpdateArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  data: z.union([ back3nd_permissionUpdateInputSchema,back3nd_permissionUncheckedUpdateInputSchema ]),
  where: back3nd_permissionWhereUniqueInputSchema,
}).strict() ;

export const back3nd_permissionUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyArgs> = z.object({
  data: z.union([ back3nd_permissionUpdateManyMutationInputSchema,back3nd_permissionUncheckedUpdateManyInputSchema ]),
  where: back3nd_permissionWhereInputSchema.optional(),
}).strict() ;

export const back3nd_permissionDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_permissionDeleteManyArgs> = z.object({
  where: back3nd_permissionWhereInputSchema.optional(),
}).strict() ;

export const back3nd_entityCreateArgsSchema: z.ZodType<Prisma.back3nd_entityCreateArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  data: z.union([ back3nd_entityCreateInputSchema,back3nd_entityUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_entityUpsertArgsSchema: z.ZodType<Prisma.back3nd_entityUpsertArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereUniqueInputSchema,
  create: z.union([ back3nd_entityCreateInputSchema,back3nd_entityUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_entityUpdateInputSchema,back3nd_entityUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_entityCreateManyArgsSchema: z.ZodType<Prisma.back3nd_entityCreateManyArgs> = z.object({
  data: z.union([ back3nd_entityCreateManyInputSchema,back3nd_entityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_entityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_entityCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_entityCreateManyInputSchema,back3nd_entityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_entityDeleteArgsSchema: z.ZodType<Prisma.back3nd_entityDeleteArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entityUpdateArgsSchema: z.ZodType<Prisma.back3nd_entityUpdateArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  data: z.union([ back3nd_entityUpdateInputSchema,back3nd_entityUncheckedUpdateInputSchema ]),
  where: back3nd_entityWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entityUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_entityUpdateManyArgs> = z.object({
  data: z.union([ back3nd_entityUpdateManyMutationInputSchema,back3nd_entityUncheckedUpdateManyInputSchema ]),
  where: back3nd_entityWhereInputSchema.optional(),
}).strict() ;

export const back3nd_entityDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_entityDeleteManyArgs> = z.object({
  where: back3nd_entityWhereInputSchema.optional(),
}).strict() ;

export const back3nd_entity_fieldsCreateArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  data: z.union([ back3nd_entity_fieldsCreateInputSchema,back3nd_entity_fieldsUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_entity_fieldsUpsertArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpsertArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereUniqueInputSchema,
  create: z.union([ back3nd_entity_fieldsCreateInputSchema,back3nd_entity_fieldsUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_entity_fieldsUpdateInputSchema,back3nd_entity_fieldsUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_entity_fieldsCreateManyArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateManyArgs> = z.object({
  data: z.union([ back3nd_entity_fieldsCreateManyInputSchema,back3nd_entity_fieldsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_entity_fieldsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_entity_fieldsCreateManyInputSchema,back3nd_entity_fieldsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_entity_fieldsDeleteArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsDeleteArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entity_fieldsUpdateArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  data: z.union([ back3nd_entity_fieldsUpdateInputSchema,back3nd_entity_fieldsUncheckedUpdateInputSchema ]),
  where: back3nd_entity_fieldsWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entity_fieldsUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateManyArgs> = z.object({
  data: z.union([ back3nd_entity_fieldsUpdateManyMutationInputSchema,back3nd_entity_fieldsUncheckedUpdateManyInputSchema ]),
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
}).strict() ;

export const back3nd_entity_fieldsDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsDeleteManyArgs> = z.object({
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
}).strict() ;

export const back3nd_password_resetCreateArgsSchema: z.ZodType<Prisma.back3nd_password_resetCreateArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  data: z.union([ back3nd_password_resetCreateInputSchema,back3nd_password_resetUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_password_resetUpsertArgsSchema: z.ZodType<Prisma.back3nd_password_resetUpsertArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereUniqueInputSchema,
  create: z.union([ back3nd_password_resetCreateInputSchema,back3nd_password_resetUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_password_resetUpdateInputSchema,back3nd_password_resetUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_password_resetCreateManyArgsSchema: z.ZodType<Prisma.back3nd_password_resetCreateManyArgs> = z.object({
  data: z.union([ back3nd_password_resetCreateManyInputSchema,back3nd_password_resetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_password_resetCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_password_resetCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_password_resetCreateManyInputSchema,back3nd_password_resetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_password_resetDeleteArgsSchema: z.ZodType<Prisma.back3nd_password_resetDeleteArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereUniqueInputSchema,
}).strict() ;

export const back3nd_password_resetUpdateArgsSchema: z.ZodType<Prisma.back3nd_password_resetUpdateArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  data: z.union([ back3nd_password_resetUpdateInputSchema,back3nd_password_resetUncheckedUpdateInputSchema ]),
  where: back3nd_password_resetWhereUniqueInputSchema,
}).strict() ;

export const back3nd_password_resetUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_password_resetUpdateManyArgs> = z.object({
  data: z.union([ back3nd_password_resetUpdateManyMutationInputSchema,back3nd_password_resetUncheckedUpdateManyInputSchema ]),
  where: back3nd_password_resetWhereInputSchema.optional(),
}).strict() ;

export const back3nd_password_resetDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_password_resetDeleteManyArgs> = z.object({
  where: back3nd_password_resetWhereInputSchema.optional(),
}).strict() ;