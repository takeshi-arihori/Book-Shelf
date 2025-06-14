import React, { useState, useEffect, useMemo } from 'react';

// 型定義
interface Component {
  Brand: string;
  Model: string;
  Benchmark: number;
  Type: string;
}

const componentTypes = ['cpu', 'gpu', 'ram', 'ssd', 'hdd'];

const ComputerBuilderPage: React.FC = () => {
  const [componentsData, setComponentsData] = useState<Record<string, Component[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component | null>>({});

  useEffect(() => {
    const fetchAllComponents = async () => {
      try {
        const requests = componentTypes.map(type =>
          fetch(`https://api.recursionist.io/builder/computers?type=${type}`).then(res => res.json())
        );
        const results = await Promise.all(requests);
        const data: Record<string, Component[]> = {};
        componentTypes.forEach((type, index) => {
          data[type] = results[index];
        });
        setComponentsData(data);
      } catch (error) {
        console.error('Error fetching components:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllComponents();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.dataset.type as string;
    const value = e.target.value;

    setSelectedComponents(prev => {
      const newSelection = { ...prev };
      if (value) {
        const component = JSON.parse(value);
        newSelection[type] = component;
        // HDDとSSDは排他的
        if (type === 'hdd') newSelection['ssd'] = null;
        if (type === 'ssd') newSelection['hdd'] = null;
      } else {
        newSelection[type] = null;
      }
      return newSelection;
    });
  };

  const isBuildable = useMemo(() => {
    return (
      selectedComponents.cpu &&
      selectedComponents.gpu &&
      selectedComponents.ram &&
      (selectedComponents.hdd || selectedComponents.ssd)
    );
  }, [selectedComponents]);

  const renderSelectors = () => {
    return componentTypes.map(type => {
      const data = componentsData[type];
      if (!data) return null;

      // HDD/SSDの排他選択を反映
      const selectedValue = selectedComponents[type] ? JSON.stringify(selectedComponents[type]) : "";

      return (
        <div key={type} className="mb-2">
          <label htmlFor={`${type}-select`} className="block text-sm font-medium text-gray-400 mb-1 uppercase">{type}</label>
          <select 
            id={`${type}-select`} 
            data-type={type} 
            className="component-select w-full rounded-md text-white p-2"
            onChange={handleSelectChange}
            value={selectedValue}
          >
            <option value="">{type.toUpperCase()} を選択...</option>
            {data.map((item, index) => (
              <option key={index} value={JSON.stringify(item)}>
                {item.Brand} {item.Model}
              </option>
            ))}
          </select>
        </div>
      );
    });
  };

  const renderCurrentBuild = () => {
    const selections = Object.entries(selectedComponents).filter(([, value]) => value);
    if (selections.length === 0) {
      return <p className="text-gray-500 text-center py-8">左のパネルからパーツを選択してください。</p>;
    }
    return selections.map(([type, item]) => (
      item && (
        <div key={type} className="text-sm">
          <span className="font-semibold uppercase text-gray-400">{type}:</span>
          <span className="ml-2">{item.Brand} {item.Model}</span>
        </div>
      )
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 h-screen flex flex-col">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-white">Computer Builder</h1>
        <p className="text-gray-400 mt-2">パーツを選んで、あなたの理想のPCを組み立てましょう。</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        {/* 左パネル: パーツ選択 */}
        <div id="component-panel" className="panel rounded-2xl shadow-lg p-6 flex flex-col space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3">1. パーツを選択</h2>
          {isLoading ? (
            <div id="initial-loader" className="text-center py-10">
              <p className="text-gray-400">パーツデータを読み込み中...</p>
            </div>
          ) : (
            <div id="component-selectors">
              {renderSelectors()}
            </div>
          )}
        </div>

        {/* 中央パネル: 現在のビルドとスコア */}
        <div className="panel rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-3">2. ビルドを構成</h2>
          <div id="current-build" className="flex-grow mt-4 space-y-3">
            {renderCurrentBuild()}
          </div>
          <div className="mt-auto">
            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-white">主な用途</h3>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="purpose" value="Gaming" className="form-radio text-indigo-500 bg-gray-800" defaultChecked />
                  <span>ゲーミング</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="purpose" value="Work" className="form-radio text-indigo-500 bg-gray-800" />
                  <span>作業用</span>
                </label>
              </div>
            </div>
            <button id="add-build-btn" className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed" disabled={!isBuildable}>
              ビルドを追加して比較
            </button>
          </div>
        </div>

        {/* 右パネル: ビルド比較 */}
        <div className="panel rounded-2xl shadow-lg flex flex-col h-full">
          <header className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">3. ビルド比較</h2>
            <p id="user-id-display" className="text-xs text-gray-500 mt-1 truncate">User ID: N/A</p>
          </header>
          <div id="comparison-container" className="flex-grow p-6 overflow-y-auto custom-scrollbar">
            <div id="builds-list" className="space-y-4">
              {/* 保存したビルドがここに表示されます */}
            </div>
            <div id="empty-build-state" className="hidden text-center py-10">
              <p className="mt-1 text-sm text-gray-500">まだビルドがありません。</p>
            </div>
            <div id="build-loader" className="hidden text-center py-10">
              <p className="text-gray-400">ビルドを読み込み中...</p>
            </div>
          </div>
        </div>
      </div>
      <div id="toast-container" className="fixed bottom-5 right-5 z-50"></div>
    </div>
  );
};

export default ComputerBuilderPage;
