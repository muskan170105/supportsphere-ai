import { useEffect, useState } from "react";

import {
  Bot,
  Database,
  ShieldCheck,
  BrainCircuit,
  Cpu,
  Settings2,
  CheckCircle2,
  Save,
} from "lucide-react";

import {
  getSettings,
  updateSettings,
} from "../api/settingsApi";

function SettingCard({
  icon,
  title,
  description,
  value,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      <div className="flex justify-between items-start">

        <div className="flex gap-4">

          <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">

            {icon}

          </div>

          <div>

            <h3 className="font-semibold text-slate-900">

              {title}

            </h3>

            <p className="text-sm text-slate-500 mt-1">

              {description}

            </p>

          </div>

        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">

          {value}

        </span>

      </div>

    </div>
  );
}

function Toggle({

  enabled = true,

  onClick,

}) {

  return (

    <button

      onClick={onClick}

      className={`
        w-14
        h-8
        rounded-full
        transition
        relative

        ${
          enabled

            ? "bg-cyan-600"

            : "bg-slate-300"

        }
      `}

    >

      <span

        className={`
          absolute
          top-1
          w-6
          h-6
          rounded-full
          bg-white
          transition

          ${
            enabled

              ? "left-7 -translate-x-full"

              : "left-1"

          }
        `}

      />

    </button>

  );

}

function Settings() {

  const [settings, setSettings] =
    useState(null);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    loadSettings();

  }, []);

  async function loadSettings() {

    try {

      const data =
        await getSettings();

      setSettings(data);

    } catch (error) {

      console.error(error);

    }

  }

  async function saveSettings() {

    if (!settings)
      return;

    try {

      setSaving(true);

      const updated =
        await updateSettings(
          settings
        );

      setSettings(updated);

    } catch (error) {

      console.error(error);

    } finally {

      setSaving(false);

    }

  }

  if (!settings) {

    return (

      <div className="text-slate-500">

        Loading Settings...

      </div>

    );

  }
  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">

            Settings

          </h1>

          <p className="text-slate-500 mt-2">

            Configure your enterprise AI platform.

          </p>

        </div>

        <button
          onClick={saveSettings}
          disabled={saving}
          className="
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-xl
            bg-cyan-600
            text-white
            font-semibold
            hover:bg-cyan-700
            transition
            disabled:opacity-60
          "
        >

          <Save size={18} />

          {

            saving

              ? "Saving..."

              : "Save Changes"

          }

        </button>

      </div>

      {/* Configuration */}

      <div className="space-y-5">

        <SettingCard

          icon={<Bot size={22} />}

          title="LLM Model"

          description="Primary language model used for response generation."

          value={settings.model}

        />

        <SettingCard

          icon={<BrainCircuit size={22} />}

          title="Planner Agent"

          description="Intent detection and orchestration engine."

          value="Enabled"

        />

        <SettingCard

          icon={<Database size={22} />}

          title="Vector Database"

          description="Knowledge retrieval using ChromaDB."

          value="Connected"

        />

        <SettingCard

          icon={<ShieldCheck size={22} />}

          title="Guardrails"

          description="Safety and confirmation workflows."

          value={
            settings.guardrails
              ? "Enabled"
              : "Disabled"
          }

        />

      </div>

      {/* Feature Toggles */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex items-center gap-3 mb-6">

          <Settings2
            size={22}
            className="text-cyan-600"
          />

          <h2 className="text-xl font-bold text-slate-900">

            Feature Controls

          </h2>

        </div>

        <div className="space-y-6">

        <FeatureRow
          title="Developer Mode"
          subtitle="Show AI reasoning and execution details."
          enabled={settings.developer_mode}
          onToggle={() =>
            setSettings({
              ...settings,
              developer_mode:
                !settings.developer_mode,
            })
          }
        />

            <FeatureRow
              title="Conversation Memory"
              subtitle="Remember previous customer interactions."
              enabled={settings.conversation_memory}
              onToggle={() =>
                setSettings({
                  ...settings,
                  conversation_memory:
                    !settings.conversation_memory,
                })
              }
            />

            <FeatureRow
              title="Retrieval Cache"
              subtitle="Reuse retrieved knowledge for follow-up questions."
              enabled={settings.retrieval_cache}
              onToggle={() =>
                setSettings({
                  ...settings,
                  retrieval_cache:
                    !settings.retrieval_cache,
                })
              }
            />

            <FeatureRow
              title="Analytics Tracking"
              subtitle="Collect execution metrics."
              enabled={settings.analytics_tracking}
              onToggle={() =>
                setSettings({
                  ...settings,
                  analytics_tracking:
                    !settings.analytics_tracking,
                })
              }
            />
        </div>

      </div>

      {/* Status */}

      <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-2xl border border-cyan-100 p-6">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">

            <Cpu
              size={26}
              className="text-cyan-600"
            />

          </div>

          <div className="flex-1">

            <h2 className="text-lg font-bold text-slate-900">

              SupportSphere AI

            </h2>

            <p className="text-sm text-slate-600 mt-1">

              Enterprise AI Platform v1.0

            </p>

          </div>

          <div className="flex items-center gap-2 text-emerald-700 font-semibold">

            <CheckCircle2 size={18} />

            Operational

          </div>

        </div>

      </div>

    </div>

  );

}

function FeatureRow({

  title,

  subtitle,

  enabled,

  onToggle,

}) {

  return (

    <div className="flex justify-between items-center">

      <div>

        <h3 className="font-semibold text-slate-900">

          {title}

        </h3>

        <p className="text-sm text-slate-500 mt-1">

          {subtitle}

        </p>

      </div>

      <Toggle

        enabled={enabled}

        onClick={onToggle}

      />

    </div>

  );

}

export default Settings;