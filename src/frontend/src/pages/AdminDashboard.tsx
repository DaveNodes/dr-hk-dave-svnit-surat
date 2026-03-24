import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  BookOpen,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  Plus,
  Power,
  Trash2,
  User,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type {
  ContactInfo,
  ProfessorProfile,
  Publication,
  Student,
} from "../backend.d";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";

type Section =
  | "overview"
  | "maintenance"
  | "profile"
  | "research"
  | "publications"
  | "students"
  | "contact";

const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: "maintenance",
    label: "Maintenance",
    icon: <Wrench className="w-4 h-4" />,
  },
  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  {
    id: "research",
    label: "Research",
    icon: <FlaskConical className="w-4 h-4" />,
  },
  {
    id: "publications",
    label: "Publications",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: "students",
    label: "Students",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
];

export default function AdminDashboard() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("overview");
  const { actor, isFetching } = useActor();
  const qc = useQueryClient();

  useEffect(() => {
    if (!isLoggedIn) navigate({ to: "/login" });
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[oklch(0.13_0.04_265)] flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[oklch(0.17_0.06_265)] border-r border-white/10 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Admin Panel</p>
              <p className="text-white/40 text-xs">SVNIT Surat</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              data-ocid={`admin.${item.id}.tab`}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                section === item.id
                  ? "bg-gold/20 text-gold font-medium"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
              {section === item.id && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <Button
            variant="ghost"
            data-ocid="admin.logout.button"
            onClick={handleLogout}
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10 gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        {section === "overview" && (
          <OverviewSection
            actor={actor}
            isFetching={isFetching}
            qc={qc}
            setSection={setSection}
          />
        )}
        {section === "maintenance" && (
          <MaintenanceSection actor={actor} isFetching={isFetching} qc={qc} />
        )}
        {section === "profile" && (
          <ProfileSection actor={actor} isFetching={isFetching} qc={qc} />
        )}
        {section === "research" && (
          <ResearchSection actor={actor} isFetching={isFetching} qc={qc} />
        )}
        {section === "publications" && (
          <PublicationsSection actor={actor} isFetching={isFetching} qc={qc} />
        )}
        {section === "students" && (
          <StudentsSection actor={actor} isFetching={isFetching} qc={qc} />
        )}
        {section === "contact" && (
          <ContactSection actor={actor} isFetching={isFetching} qc={qc} />
        )}
      </main>
    </div>
  );
}

// ─── Section Components ───────────────────────────────────────

function SectionHeader({
  title,
  description,
}: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white font-display">{title}</h1>
      {description && (
        <p className="text-white/50 text-sm mt-1">{description}</p>
      )}
    </div>
  );
}

type ActorProps = {
  actor: any;
  isFetching: boolean;
  qc: ReturnType<typeof useQueryClient>;
  setSection?: (s: Section) => void;
};

// Overview
function OverviewSection({ actor, isFetching, qc, setSection }: ActorProps) {
  const pubs = useQuery({
    queryKey: ["publications"],
    queryFn: () => actor?.getPublications() ?? [],
    enabled: !!actor && !isFetching,
  });
  const interests = useQuery({
    queryKey: ["researchInterests"],
    queryFn: () => actor?.getResearchInterests() ?? [],
    enabled: !!actor && !isFetching,
  });
  const current = useQuery({
    queryKey: ["students", "current"],
    queryFn: () => actor?.getStudents("current") ?? [],
    enabled: !!actor && !isFetching,
  });
  const alumni = useQuery({
    queryKey: ["students", "alumni"],
    queryFn: () => actor?.getStudents("alumni") ?? [],
    enabled: !!actor && !isFetching,
  });
  const maintenance = useQuery({
    queryKey: ["maintenance"],
    queryFn: () => actor?.isMaintenanceMode() ?? false,
    enabled: !!actor && !isFetching,
  });

  const toggleMaint = useMutation({
    mutationFn: (val: boolean) => actor.setMaintenanceMode(val),
    onSuccess: (_, val) => {
      qc.invalidateQueries({ queryKey: ["maintenance"] });
      toast.success(val ? "Site set to maintenance mode" : "Site is now live");
    },
    onError: () => toast.error("Failed to update maintenance mode"),
  });

  const stats = [
    {
      label: "Publications",
      value: pubs.data?.length ?? 0,
      color: "text-blue-400",
      section: "publications" as Section,
    },
    {
      label: "Research Areas",
      value: interests.data?.length ?? 0,
      color: "text-purple-400",
      section: "research" as Section,
    },
    {
      label: "Current Students",
      value: current.data?.length ?? 0,
      color: "text-green-400",
      section: "students" as Section,
    },
    {
      label: "Alumni",
      value: alumni.data?.length ?? 0,
      color: "text-gold",
      section: "students" as Section,
    },
  ];

  return (
    <div>
      <SectionHeader
        title="Admin Dashboard"
        description="Manage your academic portfolio website"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="bg-[oklch(0.2_0.06_265)] border-white/10 cursor-pointer hover:border-gold/30 transition-colors"
            onClick={() => setSection?.(s.section)}
          >
            <CardContent className="p-4">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                {s.label}
              </p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[oklch(0.2_0.06_265)] border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Power className="w-4 h-4" />
            Maintenance Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm">Website status</p>
            <p
              className={`text-lg font-semibold mt-0.5 ${
                maintenance.data ? "text-amber-400" : "text-green-400"
              }`}
            >
              {maintenance.data ? "🔧 Under Maintenance" : "✅ Live"}
            </p>
          </div>
          <Switch
            data-ocid="overview.maintenance.switch"
            checked={!!maintenance.data}
            onCheckedChange={(v) => toggleMaint.mutate(v)}
            disabled={toggleMaint.isPending}
            className="scale-125"
          />
        </CardContent>
      </Card>
    </div>
  );
}

// Maintenance
function MaintenanceSection({ actor, isFetching, qc }: ActorProps) {
  const maintenance = useQuery({
    queryKey: ["maintenance"],
    queryFn: () => actor?.isMaintenanceMode() ?? false,
    enabled: !!actor && !isFetching,
  });

  const toggleMaint = useMutation({
    mutationFn: (val: boolean) => actor.setMaintenanceMode(val),
    onSuccess: (_, val) => {
      qc.invalidateQueries({ queryKey: ["maintenance"] });
      toast.success(val ? "Maintenance mode enabled" : "Site is now live!");
    },
    onError: () => toast.error("Failed to update"),
  });

  const isOn = !!maintenance.data;

  return (
    <div>
      <SectionHeader
        title="Maintenance Mode"
        description="Control site visibility for visitors"
      />

      <Card className="bg-[oklch(0.2_0.06_265)] border-white/10 max-w-lg">
        <CardContent className="p-8 text-center space-y-6">
          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl ${
              isOn
                ? "bg-amber-400/20 border-2 border-amber-400/40"
                : "bg-green-400/20 border-2 border-green-400/40"
            }`}
          >
            {isOn ? "🔧" : "✅"}
          </div>

          <div>
            <p className="text-white font-semibold text-xl">
              {isOn ? "Maintenance Mode ON" : "Site is Live"}
            </p>
            <p className="text-white/50 text-sm mt-2">
              {isOn
                ? "Visitors see a maintenance page. Only the admin can access the site."
                : "Your website is visible to all visitors normally."}
            </p>
          </div>

          {isOn && (
            <div className="flex items-start gap-2 bg-amber-400/10 border border-amber-400/30 rounded-lg p-3 text-left">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-amber-300 text-xs">
                All public pages will show a maintenance notice until you turn
                this off.
              </p>
            </div>
          )}

          <Switch
            data-ocid="maintenance.toggle.switch"
            checked={isOn}
            onCheckedChange={(v) => toggleMaint.mutate(v)}
            disabled={toggleMaint.isPending || maintenance.isLoading}
            className="scale-150"
          />
          <p className="text-white/30 text-xs">
            {toggleMaint.isPending
              ? "Updating..."
              : isOn
                ? "Toggle OFF to go live"
                : "Toggle ON to enable maintenance"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Profile
function ProfileSection({ actor, isFetching, qc }: ActorProps) {
  const profile = useQuery<ProfessorProfile>({
    queryKey: ["professorProfile"],
    queryFn: () => actor?.getProfessorProfile(),
    enabled: !!actor && !isFetching,
  });
  const [form, setForm] = useState<ProfessorProfile | null>(null);

  useEffect(() => {
    if (profile.data && !form) setForm(profile.data);
  }, [profile.data, form]);

  const save = useMutation({
    mutationFn: (p: ProfessorProfile) => actor.updateProfessorProfile(p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["professorProfile"] });
      toast.success("Profile saved!");
    },
    onError: () => toast.error("Failed to save"),
  });

  if (profile.isLoading)
    return (
      <div className="text-white/50" data-ocid="profile.loading_state">
        Loading...
      </div>
    );
  if (!form) return null;

  const field = (
    key: keyof ProfessorProfile,
    label: string,
    multiline = false,
  ) => (
    <div className="space-y-1.5" key={key}>
      <Label className="text-white/70 text-sm">{label}</Label>
      {multiline ? (
        <Textarea
          data-ocid={`profile.${key}.textarea`}
          value={form[key]}
          onChange={(e) =>
            setForm((p) => (p ? { ...p, [key]: e.target.value } : p))
          }
          rows={4}
          className="bg-white/10 border-white/20 text-white"
        />
      ) : (
        <Input
          data-ocid={`profile.${key}.input`}
          value={form[key]}
          onChange={(e) =>
            setForm((p) => (p ? { ...p, [key]: e.target.value } : p))
          }
          className="bg-white/10 border-white/20 text-white"
        />
      )}
    </div>
  );

  return (
    <div>
      <SectionHeader
        title="Professor Profile"
        description="Edit profile information shown on the homepage"
      />
      <Card className="bg-[oklch(0.2_0.06_265)] border-white/10 max-w-2xl">
        <CardContent className="p-6 space-y-4">
          {field("name", "Full Name")}
          {field("title", "Title / Position")}
          {field("department", "Department")}
          {field("institution", "Institution")}
          {field("location", "Location")}
          {field("bio", "Biography", true)}
          <Button
            data-ocid="profile.save_button"
            onClick={() => save.mutate(form)}
            disabled={save.isPending}
            className="bg-gold text-navy font-semibold hover:bg-gold-light"
          >
            {save.isPending ? "Saving..." : "Save Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Research
function ResearchSection({ actor, isFetching, qc }: ActorProps) {
  const interests = useQuery<string[]>({
    queryKey: ["researchInterests"],
    queryFn: () => actor?.getResearchInterests() ?? [],
    enabled: !!actor && !isFetching,
  });
  const [newInterest, setNewInterest] = useState("");

  const add = useMutation({
    mutationFn: (v: string) => actor.addResearchInterest(v),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["researchInterests"] });
      setNewInterest("");
      toast.success("Interest added");
    },
    onError: () => toast.error("Failed to add"),
  });

  const remove = useMutation({
    mutationFn: (v: string) => actor.removeResearchInterest(v),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["researchInterests"] });
      toast.success("Removed");
    },
    onError: () => toast.error("Failed to remove"),
  });

  return (
    <div>
      <SectionHeader
        title="Research Interests"
        description="Manage research areas shown on the Research page"
      />
      <Card className="bg-[oklch(0.2_0.06_265)] border-white/10 max-w-xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex gap-2">
            <Input
              data-ocid="research.input"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="New research interest..."
              className="bg-white/10 border-white/20 text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter" && newInterest.trim())
                  add.mutate(newInterest.trim());
              }}
            />
            <Button
              data-ocid="research.add_button"
              onClick={() => {
                if (newInterest.trim()) add.mutate(newInterest.trim());
              }}
              disabled={add.isPending || !newInterest.trim()}
              className="bg-gold text-navy hover:bg-gold-light shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <Separator className="bg-white/10" />
          {interests.isLoading ? (
            <p
              className="text-white/40 text-sm"
              data-ocid="research.loading_state"
            >
              Loading...
            </p>
          ) : (
            <ul className="space-y-2" data-ocid="research.list">
              {(interests.data ?? []).map((interest, i) => (
                <li
                  key={interest}
                  data-ocid={`research.item.${i + 1}`}
                  className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
                >
                  <span className="text-white/80 text-sm">{interest}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-ocid={`research.delete_button.${i + 1}`}
                    onClick={() => remove.mutate(interest)}
                    disabled={remove.isPending}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 w-7 h-7"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </li>
              ))}
              {(interests.data ?? []).length === 0 && (
                <p
                  className="text-white/30 text-sm text-center py-4"
                  data-ocid="research.empty_state"
                >
                  No research interests yet.
                </p>
              )}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Publications
function PublicationsSection({ actor, isFetching, qc }: ActorProps) {
  const pubs = useQuery<Publication[]>({
    queryKey: ["publications"],
    queryFn: () => actor?.getPublications() ?? [],
    enabled: !!actor && !isFetching,
  });

  const emptyPub: Omit<Publication, "year"> & { year: string } = {
    title: "",
    publication: "",
    year: "",
    link: "",
  };
  const [form, setForm] = useState(emptyPub);

  const add = useMutation({
    mutationFn: (p: Publication) => actor.updatePublication(p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["publications"] });
      setForm(emptyPub);
      toast.success("Publication saved");
    },
    onError: () => toast.error("Failed to save"),
  });

  const remove = useMutation({
    mutationFn: (title: string) => actor.removePublication(title),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["publications"] });
      toast.success("Removed");
    },
    onError: () => toast.error("Failed to remove"),
  });

  const handleAdd = () => {
    if (!form.title || !form.publication || !form.year) return;
    add.mutate({ ...form, year: BigInt(form.year) });
  };

  return (
    <div>
      <SectionHeader
        title="Publications"
        description="Manage publications list"
      />

      {/* Add form */}
      <Card className="bg-[oklch(0.2_0.06_265)] border-white/10 max-w-2xl mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm">Add Publication</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          <Input
            data-ocid="publications.title.input"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Title"
            className="bg-white/10 border-white/20 text-white"
          />
          <Input
            data-ocid="publications.publication.input"
            value={form.publication}
            onChange={(e) =>
              setForm((p) => ({ ...p, publication: e.target.value }))
            }
            placeholder="Journal / Conference"
            className="bg-white/10 border-white/20 text-white"
          />
          <div className="flex gap-2">
            <Input
              data-ocid="publications.year.input"
              type="number"
              value={form.year}
              onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
              placeholder="Year"
              className="bg-white/10 border-white/20 text-white w-28"
            />
            <Input
              data-ocid="publications.link.input"
              value={form.link}
              onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))}
              placeholder="URL (optional)"
              className="bg-white/10 border-white/20 text-white flex-1"
            />
          </div>
          <Button
            data-ocid="publications.add_button"
            onClick={handleAdd}
            disabled={add.isPending || !form.title}
            className="bg-gold text-navy hover:bg-gold-light"
          >
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </CardContent>
      </Card>

      {/* List */}
      <div className="space-y-2 max-w-2xl">
        {pubs.isLoading && (
          <p
            className="text-white/40 text-sm"
            data-ocid="publications.loading_state"
          >
            Loading...
          </p>
        )}
        {(pubs.data ?? []).length === 0 && !pubs.isLoading && (
          <p
            className="text-white/30 text-sm"
            data-ocid="publications.empty_state"
          >
            No publications yet.
          </p>
        )}
        {(pubs.data ?? []).map((p, i) => (
          <Card
            key={p.title}
            data-ocid={`publications.item.${i + 1}`}
            className="bg-[oklch(0.2_0.06_265)] border-white/10"
          >
            <CardContent className="p-4 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {p.title}
                </p>
                <p className="text-white/50 text-xs mt-0.5">
                  {p.publication} — {String(p.year)}
                </p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold text-xs underline"
                  >
                    View
                  </a>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                data-ocid={`publications.delete_button.${i + 1}`}
                onClick={() => remove.mutate(p.title)}
                disabled={remove.isPending}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Students
function StudentsSection({ actor, isFetching, qc }: ActorProps) {
  const current = useQuery<Student[]>({
    queryKey: ["students", "current"],
    queryFn: () => actor?.getStudents("current") ?? [],
    enabled: !!actor && !isFetching,
  });
  const alumni = useQuery<Student[]>({
    queryKey: ["students", "alumni"],
    queryFn: () => actor?.getStudents("alumni") ?? [],
    enabled: !!actor && !isFetching,
  });

  const emptyStudent: Student = {
    name: "",
    degreeType: "PhD",
    topic: "",
    status: "current",
  };
  const [form, setForm] = useState<Student>(emptyStudent);

  const add = useMutation({
    mutationFn: (s: Student) => actor.addOrUpdateStudent(s),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      setForm(emptyStudent);
      toast.success("Student saved");
    },
    onError: () => toast.error("Failed to save"),
  });

  const remove = useMutation({
    mutationFn: (name: string) => actor.removeStudent(name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      toast.success("Removed");
    },
    onError: () => toast.error("Failed to remove"),
  });

  const StudentList = ({
    data,
    prefix,
  }: { data: Student[]; prefix: string }) => (
    <div className="space-y-2">
      {data.length === 0 && (
        <p
          className="text-white/30 text-sm py-4 text-center"
          data-ocid={`${prefix}.empty_state`}
        >
          No students.
        </p>
      )}
      {data.map((s, i) => (
        <div
          key={s.name}
          data-ocid={`${prefix}.item.${i + 1}`}
          className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
        >
          <div>
            <p className="text-white text-sm font-medium">{s.name}</p>
            <p className="text-white/50 text-xs">
              {s.degreeType} · {s.topic}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            data-ocid={`${prefix}.delete_button.${i + 1}`}
            onClick={() => remove.mutate(s.name)}
            disabled={remove.isPending}
            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <SectionHeader
        title="Students Manager"
        description="Manage current students and alumni"
      />

      <Card className="bg-[oklch(0.2_0.06_265)] border-white/10 max-w-xl mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm">Add Student</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          <Input
            data-ocid="students.name.input"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Full name"
            className="bg-white/10 border-white/20 text-white"
          />
          <Input
            data-ocid="students.topic.input"
            value={form.topic}
            onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
            placeholder="Research topic"
            className="bg-white/10 border-white/20 text-white"
          />
          <div className="flex gap-2">
            <Select
              value={form.degreeType}
              onValueChange={(v) => setForm((p) => ({ ...p, degreeType: v }))}
            >
              <SelectTrigger
                data-ocid="students.degree.select"
                className="bg-white/10 border-white/20 text-white"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PhD">PhD</SelectItem>
                <SelectItem value="MTech">MTech</SelectItem>
                <SelectItem value="BTech">BTech</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={form.status}
              onValueChange={(v) => setForm((p) => ({ ...p, status: v }))}
            >
              <SelectTrigger
                data-ocid="students.status.select"
                className="bg-white/10 border-white/20 text-white"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            data-ocid="students.add_button"
            onClick={() => {
              if (form.name) add.mutate(form);
            }}
            disabled={add.isPending || !form.name}
            className="bg-gold text-navy hover:bg-gold-light"
          >
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="current" className="max-w-xl">
        <TabsList className="bg-white/10">
          <TabsTrigger
            data-ocid="students.current.tab"
            value="current"
            className="data-[state=active]:bg-gold data-[state=active]:text-navy text-white/60"
          >
            Current Students
          </TabsTrigger>
          <TabsTrigger
            data-ocid="students.alumni.tab"
            value="alumni"
            className="data-[state=active]:bg-gold data-[state=active]:text-navy text-white/60"
          >
            Alumni
          </TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="mt-4">
          {current.isLoading ? (
            <p
              className="text-white/40 text-sm"
              data-ocid="students.current.loading_state"
            >
              Loading...
            </p>
          ) : (
            <StudentList data={current.data ?? []} prefix="students.current" />
          )}
        </TabsContent>
        <TabsContent value="alumni" className="mt-4">
          {alumni.isLoading ? (
            <p
              className="text-white/40 text-sm"
              data-ocid="students.alumni.loading_state"
            >
              Loading...
            </p>
          ) : (
            <StudentList data={alumni.data ?? []} prefix="students.alumni" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Contact
function ContactSection({ actor, isFetching, qc }: ActorProps) {
  const contact = useQuery<ContactInfo>({
    queryKey: ["contactInfo"],
    queryFn: () => actor?.getContactInfo(),
    enabled: !!actor && !isFetching,
  });
  const [form, setForm] = useState<ContactInfo | null>(null);
  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    if (contact.data && !form) setForm(contact.data);
  }, [contact.data, form]);

  const save = useMutation({
    mutationFn: (c: ContactInfo) => actor.updateContactInfo(c),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contactInfo"] });
      toast.success("Contact info saved");
    },
    onError: () => toast.error("Failed to save"),
  });

  if (contact.isLoading)
    return (
      <p className="text-white/40 text-sm" data-ocid="contact.loading_state">
        Loading...
      </p>
    );
  if (!form) return null;

  return (
    <div>
      <SectionHeader
        title="Contact Information"
        description="Update email, address, and external links"
      />
      <Card className="bg-[oklch(0.2_0.06_265)] border-white/10 max-w-xl">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-white/70 text-sm">Email</Label>
            <Input
              data-ocid="contact.email.input"
              value={form.email}
              onChange={(e) =>
                setForm((p) => (p ? { ...p, email: e.target.value } : p))
              }
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-white/70 text-sm">Address</Label>
            <Textarea
              data-ocid="contact.address.textarea"
              value={form.address}
              onChange={(e) =>
                setForm((p) => (p ? { ...p, address: e.target.value } : p))
              }
              rows={3}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white/70 text-sm">External Links</Label>
            {form.externalLinks.map((link, i) => (
              <div
                key={link || i}
                data-ocid={`contact.link.item.${i + 1}`}
                className="flex gap-2"
              >
                <Input
                  value={link}
                  readOnly
                  className="bg-white/5 border-white/10 text-white/60 text-xs flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  data-ocid={`contact.link.delete_button.${i + 1}`}
                  onClick={() =>
                    setForm((p) =>
                      p
                        ? {
                            ...p,
                            externalLinks: p.externalLinks.filter(
                              (_, j) => j !== i,
                            ),
                          }
                        : p,
                    )
                  }
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input
                data-ocid="contact.link.input"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="https://..."
                className="bg-white/10 border-white/20 text-white"
              />
              <Button
                data-ocid="contact.link.add_button"
                variant="outline"
                onClick={() => {
                  if (newLink.trim()) {
                    setForm((p) =>
                      p
                        ? {
                            ...p,
                            externalLinks: [...p.externalLinks, newLink.trim()],
                          }
                        : p,
                    );
                    setNewLink("");
                  }
                }}
                className="border-white/20 text-white/70 hover:bg-white/5 shrink-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            data-ocid="contact.save_button"
            onClick={() => save.mutate(form)}
            disabled={save.isPending}
            className="bg-gold text-navy hover:bg-gold-light"
          >
            {save.isPending ? "Saving..." : "Save Contact Info"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
