export interface LocalePausedContent {
  messageBlock: {
    title: string;
  };
  actionBlock: {
    title: string;
    info: Array<{
      title: string;
      content: string[];
    }>;
  };
}

export const PAUSED_ACTIVITY_LOCALES: Record<string, LocalePausedContent> = {
  "en-US": {
    messageBlock: {
      title: "Your Browsing Activity Has Been Paused"
    },
    actionBlock: {
      title: "We've detected unusual behavior on either your network or your browser.",
      info: [
        {
          title: "To resolve this:",
          content: [
            "Sign in to your account if you haven't already",
            "Change your Wi-Fi or cellular network",
            "Switch devices or move to a different location if possible"
          ]
        }
      ]
    }
  },
  "en-GB": {
    messageBlock: {
      title: "Your Browsing Activity Has Been Paused"
    },
    actionBlock: {
      title: "We've detected unusual behaviour on either your network or your browser.",
      info: [
        {
          title: "To resolve this:",
          content: [
            "Sign in to your account if you haven't already on one device only",
            "Change your Wi-Fi or mobile network",
            "Switch devices or move to a different location if possible"
          ]
        }
      ]
    }
  },
  "en-IE": {
    messageBlock: {
      title: "Your Browsing Activity Has Been Paused"
    },
    actionBlock: {
      title: "We've detected unusual behaviour on either your network or your browser.",
      info: [
        {
          title: "To resolve this:",
          content: [
            "Sign in to your account if you haven't already on one device only",
            "Change your Wi-Fi or mobile network",
            "Switch devices or move to a different location if possible"
          ]
        }
      ]
    }
  },
  "fr-FR": {
    messageBlock: {
      title: "Votre session a été suspendue"
    },
    actionBlock: {
      title: "Quelque chose dans votre comportement de navigation ou votre réseau nous a fait penser que vous étiez un robot.",
      info: [
        {
          title: "Que faire pour résoudre ce problème?",
          content: [
            "Réessayez à partir d'un autre appareil ou d'un autre endroit",
            "Assurez-vous d'avoir activé JavaScript dans votre navigateur web",
            "Supprimez tous les plugins de navigateur tiers qui peuvent être en cours d'exécution"
          ]
        }
      ]
    }
  },
  "fr-CA": {
    messageBlock: {
      title: "Votre session a été suspendue"
    },
    actionBlock: {
      title: "Quelque chose dans votre comportement de navigation ou votre réseau nous a fait penser que vous étiez un robot.",
      info: [
        {
          title: "Que faire pour résoudre ce problème?",
          content: [
            "Réessayez à partir d'un autre appareil ou d'un autre endroit",
            "Assurez-vous d'avoir activé JavaScript dans votre navigateur web",
            "Supprimez tous les plugins de navigateur tiers qui peuvent être en cours d'exécution"
          ]
        }
      ]
    }
  },
  "fr-CH": {
    messageBlock: {
      title: "Votre session a été suspendue"
    },
    actionBlock: {
      title: "Quelque chose dans votre comportement de navigation ou votre réseau nous a fait penser que vous étiez un robot.",
      info: [
        {
          title: "Que faire pour résoudre ce problème?",
          content: [
            "Réessayez à partir d'un autre appareil ou d'un autre endroit",
            "Assurez-vous d'avoir activé JavaScript dans votre navigateur web",
            "Supprimez tous les plugins de navigateur tiers qui peuvent être en cours d'exécution"
          ]
        }
      ]
    }
  },
  "it-IT": {
    messageBlock: {
      title: "La tua sessione è stata sospesa"
    },
    actionBlock: {
      title: "Qualcosa nel comportamento del tuo browser o della rete con cui stai navigando ci fa pensare che potresti essere un bot.",
      info: [
        {
          title: "Cosa posso fare per risolvere?",
          content: [
            "Riprova a collegarti da un altro dispositivo oppure da un luogo diverso",
            "Assicurati di aver abilitato javascript sul tuo browser",
            "Rimuovi qualsiasi plugin di terze parti che potrebbe essere attivo sul tuo browser"
          ]
        }
      ]
    }
  },
  "it-CH": {
    messageBlock: {
      title: "La tua sessione è stata sospesa"
    },
    actionBlock: {
      title: "Qualcosa nel comportamento del tuo browser o della rete con cui stai navigando ci fa pensare che potresti essere un bot.",
      info: [
        {
          title: "Cosa posso fare per risolvere?",
          content: [
            "Riprova a collegarti da un altro dispositivo oppure da un luogo diverso",
            "Assicurati di aver abilitato javascript sul tuo browser",
            "Rimuovi qualsiasi plugin di terze parti che potrebbe essere attivo sul tuo browser"
          ]
        }
      ]
    }
  },
  "es-ES": {
    messageBlock: {
      title: "Su sesión se ha suspendido"
    },
    actionBlock: {
      title: "Algo en su forma de navegar o en su red nos hizo pensar que era un bot.",
      info: [
        {
          title: "¿Cómo puedo resolverlo?",
          content: [
            "Inténtalo de nuevo desde otro dispositivo o desde otra ubicación",
            "Asegúrese de activar JavaScript en su navegador web",
            "Elimine los plug-ins de otros navegadores que se estén ejecutando."
          ]
        }
      ]
    }
  },
  "es-MX": {
    messageBlock: {
      title: "Su sesión se ha suspendido"
    },
    actionBlock: {
      title: "Algo en su forma de navegar o en su red nos hizo pensar que era un bot.",
      info: [
        {
          title: "¿Cómo puedo resolverlo?",
          content: [
            "Inténtalo de nuevo desde otro dispositivo o desde otra ubicación",
            "Asegúrese de activar JavaScript en su navegador web",
            "Elimine los plug-ins de otros navegadores que se estén ejecutando."
          ]
        }
      ]
    }
  }
};
